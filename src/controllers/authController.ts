import type { Request, Response } from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and Password are required!" });
    }

    const doesUserExist = await User.findOne({ email });
    if (!doesUserExist) {
      return res
        .status(400)
        .json({ success: false, error: "User does not exist!" });
    }

    const passwordIsValid = await bcrypt.compare(
      password,
      doesUserExist.password
    );
    if (!passwordIsValid) {
      return res
        .status(400)
        .json({ success: false, error: "Email or password is incorrect!" });
    }

    const accessToken = jsonwebtoken.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successful!", accessToken });
  } catch (error) {
    console.log(error);
  }
};
