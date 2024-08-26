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

    const { identifier } = req.params; // identifier can be username or email or firsName or lastName

    const users = await UserModel.find({
      $or: [
        { username: identifier },
        { email: identifier },
        { firstName: identifier },
        { lastName: identifier },
      ],
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
