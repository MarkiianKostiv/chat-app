import { Document, ObjectId } from "mongoose";

export interface IChat extends Document {
  _id: string;
  participants: ObjectId[];
  messages: ObjectId[];
}
