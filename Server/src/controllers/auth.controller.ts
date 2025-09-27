import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import asyncHandler from "../utils/asyncHandler.utils";
import {
  loginSchema,
  signupSchema,
} from "../utils/validationSchema/Schema.utils";
import VAR from "../config/constants";

const signup = asyncHandler(async (req: Request, res: Response) => {
  const { data } = req.body;

  const [existingName, existingEmail] = await Promise.all([
    User.findOne({ name: data.name }),
    User.findOne({ email: data.email }),
  ]);

  if (existingEmail) {
    return res.status(400).json({
      success: false,
      error: "this email already exist!",
    });
  }

  if (existingName) {
    return res.status(400).json({
      success: false,
      error: "username already taken!",
    });
  }

  const newUser = await User.create({
    name: data.name,
    email: data.email,
    password: data.password,
    description: "",
    avatar: "",
  });

  if (!newUser) {
    return res.status(400).json({
      success: false,
      error: "error is occur while signup!",
    });
  }

  return res.status(200).json({
    success: true,
    message: "signup successfully!",
    data: newUser,
  });
});

const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { data, error } = loginSchema.safeParse(req.body);

    if (error)
      return res
        .status(400)
        .json({ success: false, message: "invalid request!" });

    const existedUser = await User.findOne({ email: data.email });

    if (!existedUser)
      return res.status(400).json({
        success: false,
        message: "user not registered please signup first!",
      });

    const isMatch = await existedUser.isPasswordCorrect(data.password);
    if (!isMatch)
      return res
        .status(404)
        .json({ success: false, message: "user not authorized!" });

    const token = existedUser.generateToken();

    if (!token)
      return res
        .status(500)
        .json({ success: false, message: "error while user login!" });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: VAR.NODE_ENV == "production",
    });

    res.status(200).json({
      success: true,
      message: "user login successfully!",
      data: {
        token: token,
      },
    });
  }
);

const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: VAR.NODE_ENV == "production",
    });

    res.status(200).json({
      success: true,
      message: "user login succesfully!",
    });
  }
);

export { signup, login, logout };
