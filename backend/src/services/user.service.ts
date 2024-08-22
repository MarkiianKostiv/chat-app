import { Response } from "express";
import { CustomRequest } from "../interfaces/castomreqest";
import UserModel from "../db/mongodb/schema/user.schema";

export const getUsers = async (req: CustomRequest, res: Response) => {
  try {
    const loggedInUserId = req.user?._id;

    if (!loggedInUserId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const allUsers = await UserModel.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(allUsers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserByIdentifier = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const loggedInUserId = req.user?._id;

    if (!loggedInUserId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { identifier } = req.params; // identifier can be username or email or firsName or lastName

    const users = await UserModel.find({
      $or: [
        { username: identifier },
        { email: identifier },
        { firstName: identifier },
        { lastName: identifier },
      ],
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
