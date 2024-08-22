import { IUser } from "../db/mongodb/model/user.model";
import { Request } from "express";
export interface CustomRequest extends Request {
  user?: IUser;
}
