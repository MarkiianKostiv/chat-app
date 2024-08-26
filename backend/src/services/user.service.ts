import { Response } from "express";
import { CustomRequest } from "../interfaces/castomreqest";
import UserModel from "../db/mongodb/schema/user.schema";
import ChatSchema from "../db/mongodb/schema/chat.schema";

export const getUsers = async (req: CustomRequest, res: Response) => {
  try {
    const loggedInUserId = req.user?._id;

    if (!loggedInUserId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const chats = await ChatSchema.find({
      participants: loggedInUserId,
    }).populate({
      path: "messages",
      options: { sort: { createdAt: -1 }, limit: 1 },
    });

    if (!chats.length) {
      return res.status(200).json([]);
    }

    const usersWithLastMessages = await Promise.all(
      chats.map(async (chat) => {
        const lastMessage = chat.messages[0];
        const otherParticipantId = chat.participants.find(
          (id: any) => id.toString() !== loggedInUserId.toString()
        );
        const user = await UserModel.findById(otherParticipantId).select(
          "-password"
        );

        return {
          user,
          lastMessage,
        };
      })
    );

    res.status(200).json(usersWithLastMessages);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserByIdentifier = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const loggedInUserId = req.user?._id;

    if (!loggedInUserId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const identifier = req.query.identifier?.toString();

    let users;
    if (identifier) {
      users = await UserModel.find({
        $or: [
          { username: { $regex: identifier, $options: "i" } },
          { email: { $regex: identifier, $options: "i" } },
          { firstName: { $regex: identifier, $options: "i" } },
          { lastName: { $regex: identifier, $options: "i" } },
        ],
        _id: { $ne: loggedInUserId },
      }).select("-password");
    } else {
      users = await UserModel.find({
        _id: { $ne: loggedInUserId },
      }).select("-password");
    }

    const chats = await ChatSchema.find({
      participants: loggedInUserId,
    }).populate({
      path: "messages",
      options: { sort: { createdAt: -1 }, limit: 1 },
    });

    // Create a map of existing chats for quick lookup
    const chatMap = new Map();
    chats.forEach((chat) => {
      const otherParticipantId = chat.participants.find(
        (id: any) => id.toString() !== loggedInUserId.toString()
      );
      if (otherParticipantId) {
        chatMap.set(
          otherParticipantId.toString(),
          chat.messages[0] || { message: "" }
        );
      }
    });

    const usersWithLastMessages = await Promise.all(
      users.map(async (user) => {
        const lastMessage = chatMap.get(user._id.toString()) || { message: "" };
        return {
          user,
          lastMessage: lastMessage.message,
        };
      })
    );

    res.status(200).json(usersWithLastMessages);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
