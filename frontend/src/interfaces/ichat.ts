import { IUser } from "./iuser";

export interface IChat {
  _id: string;
  user: IUser;
  lastMessage?: {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
