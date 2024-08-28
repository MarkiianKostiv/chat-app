import { Request, Response } from "express";
import UserModel from "../db/mongodb/schema/user.schema";
import ChatSchema from "../db/mongodb/schema/chat.schema";
import MessageSchema from "../db/mongodb/schema/message.schema";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generatetoken";
import getRandomQuote from "../utils/getRandomQuote";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, firstName, lastName, email, password, confirmPassword } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await UserModel.findOne({ username });

    if (user) {
      return res
        .status(400)
        .json({ error: `Username: ${username} already taken` });
    }

    const userEmail = await UserModel.findOne({ email });

    if (userEmail) {
      return res.status(400).json({ error: `Email: ${email} already exists` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // IDs of the bots you created earlier
    const botIds = [
      "66cee93b2b5d6998a1de9cde",
      "66cee93b2b5d6998a1de9ce1",
      "66cee93b2b5d6998a1de9ce4",
    ];

    // Automatically create chats with the bots
    for (const botId of botIds) {
      let conversation = await ChatSchema.create({
        participants: [newUser._id, botId],
      });

      // Get a random quote and send it as the first message in each chat
      const quote = await getRandomQuote();
      const initialMessage = new MessageSchema({
        senderId: botId,
        receiverId: newUser._id,
        message: quote,
      });

      conversation.messages.push(initialMessage._id);
      await Promise.all([initialMessage.save(), conversation.save()]);
    }

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body; // identifier can be username or email

    const user = await UserModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      res.status(400).json({ error: "User doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user && !isPasswordCorrect) {
      res.status(400).json({ error: "Credentials are incorrect" });
    }

    if (user) {
      generateTokenAndSetCookie(user._id, res);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", { maxAge: 0 });

    res.status(200).json({ message: "Logout successful" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
