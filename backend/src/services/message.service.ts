import { Response } from "express";
import { Types } from "mongoose";
import ChatSchema from "../db/mongodb/schema/chat.schema";
import MessageSchema from "../db/mongodb/schema/message.schema";
import UserModel from "../db/mongodb/schema/user.schema";
import { CustomRequest } from "../interfaces/castomreqest";
import { getReceiverSocketId, io } from "../socket/socket";
import getRandomQuote from "../utils/getRandomQuote";

export const sendMessage = async (req: CustomRequest, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;

    if (!message) {
      return res.status(400).json({ error: "Message content is required" });
    }

    const senderId = req.user?._id;

    if (!senderId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const receiverObjectId = new Types.ObjectId(receiverId);

    let conversation = await ChatSchema.findOne({
      participants: { $all: [senderId, receiverObjectId] },
    });

    if (!conversation) {
      conversation = await ChatSchema.create({
        participants: [senderId, receiverObjectId],
      });
    }

    const newMessage = new MessageSchema({
      senderId,
      receiverId: receiverObjectId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);

      await Promise.all([newMessage.save(), conversation.save()]);

      const receiverSocketId = getReceiverSocketId(receiverId);
      const senderSocketId = getReceiverSocketId(senderId.toString());

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      if (senderSocketId) {
        io.to(senderSocketId).emit("newMessage", newMessage);
      }

      // Check if the receiver is a bot
      const receiverUser = await UserModel.findById(receiverObjectId);
      if (receiverUser && receiverUser.username.startsWith("quoteBot")) {
        // Get a random quote and send it back as a response
        const botReplyMessage = new MessageSchema({
          senderId: receiverObjectId,
          receiverId: senderId,
          message: await getRandomQuote(),
        });

        conversation.messages.push(botReplyMessage._id);

        await Promise.all([botReplyMessage.save(), conversation.save()]);

        if (senderSocketId) {
          io.to(senderSocketId).emit("newMessage", botReplyMessage);
        }
      }

      res.status(200).json(newMessage);
    } else {
      res.status(400).json({ error: "Message was not created" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessages = async (req: CustomRequest, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const userToChatObjectId = new Types.ObjectId(userToChatId);
    const senderId = req.user?._id;

    if (!senderId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const conversation = await ChatSchema.findOne({
      participants: { $all: [senderId, userToChatObjectId] },
    }).populate("messages");
    if (!conversation) {
      res.status(200).json([]);
    }

    res.status(200).json(conversation?.messages);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
