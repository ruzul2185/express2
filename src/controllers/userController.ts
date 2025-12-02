import type { Request, Response } from "express";
import { User } from "../models/userModel.js";
import mongoose from "mongoose";
import { ValidateId } from "../utils/idValidator.js";

export const getUser = async (req: Request, res: Response) => {
  try {
    const UserList = await User.find({});
    return res.status(200).json({ success: true, users: UserList });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ success: false, error: "Id is invalid!" });
  }

  const singleUser = await User.findById({ _id: id });
  if (!singleUser) {
    return res
      .status(400)
      .json({ success: false, error: "User does not exist!" });
  }

  return res.status(200).json({ success: true, users: singleUser });
};

export const createUser = async (req: Request, res: Response) => {
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

export const patchUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body; // only id
    const patchData = req.body; //data without id

    delete patchData.Id;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, error: "Id is required!" });
    }

    const doesUserExist = await User.findById({ _id: id });
    if (!doesUserExist) {
      return res
        .status(400)
        .json({ success: false, error: "User does not exist!" });
    }

    const updatedUser = await User.findByIdAndUpdate({ _id: id }, patchData, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(400)
        .json({ success: false, error: "Something went wrong!" });
    }

    return res.status(200).json({ success: true, User: updatedUser });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id && ValidateId(id!)) {
    return res.status(400).json({ success: false, error: "Id is invalid!" });
  }

  const deletedUser = await User.findByIdAndDelete({ _id: id });
  if (!deletedUser) {
    return res
      .status(400)
      .json({ success: false, error: "User does not exist!" });
  }

  return res.status(200).json({ success: true, users: deletedUser });
};
