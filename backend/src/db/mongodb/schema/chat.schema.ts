import { Schema, model } from "mongoose";
import { IChat } from "../model/chat.model";

const schema = new Schema<IChat>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "user" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "message", default: [] }],
  },
  {
    timestamps: true,
  }
);

export default model<IChat>("chat", schema);
