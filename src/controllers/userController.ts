import type { Request, Response } from "express";
import { User } from "../models/userModel.js";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and Password are required!" });
    }

    const doesUserExist = await User.findOne({ email });
    if (doesUserExist) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists!" });
    }

    const newUser = await User.create({ email, password });
    if (!newUser) {
      return res
        .status(400)
        .json({ success: false, error: "User not created!" });
    }

    return res.status(200).json({ success: true, user: newUser });
  } catch (error) {
    console.log(error);
  }
};
