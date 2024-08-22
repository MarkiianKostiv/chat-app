import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import UserModel from "../db/mongodb/schema/user.schema";
import { CustomRequest } from "../interfaces/castomreqest";

const protectRoute = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await UserModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Initial server Error" });
  }
};

export default protectRoute;
