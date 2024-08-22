import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
