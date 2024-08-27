import { Response } from "express";
import { CustomRequest } from "../interfaces/castomreqest";
import chatSchema from "../db/mongodb/schema/chat.schema";

export const deleteChat = async (req: CustomRequest, res: Response) => {
  const { id: receiverId } = req.params;
  const senderId = req.user?._id;

  if (!senderId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const chat = await chatSchema.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    await chatSchema.deleteOne({ _id: chat._id });

    return res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the chat" });
  }
};
