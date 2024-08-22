import { Schema, model } from "mongoose";
import { IUser } from "../model/user.model";

const schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      unique: false,
    },
    lastName: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("user", schema);
