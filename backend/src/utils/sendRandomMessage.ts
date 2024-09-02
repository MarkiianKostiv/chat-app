import UserModel from "../db/mongodb/schema/user.schema";
import ChatSchema from "../db/mongodb/schema/chat.schema";
import MessageSchema from "../db/mongodb/schema/message.schema";
import getRandomQuote from "../utils/getRandomQuote";
import { io, getReceiverSocketId } from "../socket/socket";

export const sendRandomMessage = async () => {
  try {
    const users = await UserModel.find({
      "settings.sendMessageToRandomChat": true,
    });

    for (const user of users) {
      let chats = await ChatSchema.find({
        participants: user._id,
      });

      if (chats.length === 0) {
        user.settings.sendMessageToRandomChat = false;
        await user.save();
        continue;
      }

      while (chats.length > 0) {
        const randomIndex = Math.floor(Math.random() * chats.length);
        const randomChat = chats.splice(randomIndex, 1)[0];

        const otherParticipantId = randomChat.participants.find(
          (participantId) => participantId.toString() !== user._id.toString()
        );

        if (!otherParticipantId) continue;

        const message = await getRandomQuote();

        const newMessage = new MessageSchema({
          senderId: user._id,
          receiverId: otherParticipantId,
          message,
        });

        console.log("New random message sent: " + newMessage);

        randomChat.messages.push(newMessage._id);
        await Promise.all([newMessage.save(), randomChat.save()]);

        const receiverSocketId = getReceiverSocketId(
          otherParticipantId.toString()
        );
        const senderSocketId = getReceiverSocketId(user._id.toString());

        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        if (senderSocketId) {
          io.to(senderSocketId).emit("newMessage", newMessage);
        }

        break;
      }
    }
  } catch (error) {
    console.error("Error sending random messages:", error);
  }
};
