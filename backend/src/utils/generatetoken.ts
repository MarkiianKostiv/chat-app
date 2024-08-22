import jwt from "jsonwebtoken";
import { Response } from "express";

const generateTokenAndSetCookie = (userId: string, res: Response) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,
    sameSite: "strict",
  });
};

export default generateTokenAndSetCookie;
