import { Request, Response } from "express";
import UserModel from "../db/mongodb/schema/user.schema";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generatetoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, firstName, lastName, email, password, confirmPassword } =
      req.body;
    if (password !== confirmPassword) {
      res.status(400).json({ error: "Passwords fo not match" });
    }

    const user = await UserModel.findOne({ username });

    if (user) {
      res.status(400).json({ error: `Username: ${username} already taken` });
    }

    const userEmail = await UserModel.findOne({ email });

    if (userEmail) {
      res.status(400).json({ error: `Email: ${email} already exist` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel();
    newUser.username = username;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = hashedPassword;
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ error: "Invalid user Data" });
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
