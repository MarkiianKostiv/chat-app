import { Schema, model } from "mongoose";
import { IMessage } from "../model/message.model";

const schema = new Schema<IMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IMessage>("message", schema);
