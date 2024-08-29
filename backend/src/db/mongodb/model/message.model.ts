import { Document, ObjectId } from "mongoose";

export interface IMessage extends Document {
  _id: ObjectId & string;
  senderId: ObjectId | string;
  receiverId: ObjectId | string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
