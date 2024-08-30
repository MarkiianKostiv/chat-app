import { Response } from "express";
import { CustomRequest } from "../interfaces/castomreqest";
import UserModel from "../db/mongodb/schema/user.schema";
import ChatModel from "../db/mongodb/schema/chat.schema";

export const updateProfileSettings = async (
  req: CustomRequest,
  res: Response
) => {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hasActiveChats = await ChatModel.exists({
      participants: userId,
    });

    if (!hasActiveChats && !user.settings.sendMessageToRandomChat) {
      return res.status(400).json({
        error: "Cannot enable setting: No active chats available",
      });
    }

    user.settings.sendMessageToRandomChat =
      !user.settings.sendMessageToRandomChat;

    await user.save();

    return res.status(200).json({
      message: "Settings updated successfully",
      settings: user.settings,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
