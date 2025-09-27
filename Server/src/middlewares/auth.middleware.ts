import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import VAR from "../config/constants";
import type { StringValue } from "ms";
import User from "../models/user.model";
import mongoose from "mongoose";

export interface AuthHandler extends Request {
  user?: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
  };
}

const authentication = async (
  req: AuthHandler,
  res: Response,
  next: NextFunction
) => {
  let token: string = "";

  if (!req.cookies.token) {
    if (!req.body.authentication)
      return res.status(400).json({
        success: false,
        message: "user not login!",
      });

    token = req.body.authentication.splice(7).trim();
  }

  token = req.cookies.token;

  interface DecodedToken {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    iat: number;
    exp: number;
  }
  const decodedToken: DecodedToken = jwt.verify(
    token,
    VAR.JWT_SECRET as StringValue
  ) as DecodedToken;

  if (!decodedToken) {
    return res.status(400).json({
      success: false,
      message: "user not authorized!",
    });
  }

  const isUserExist = User.findById(decodedToken._id);

  if (!isUserExist) {
    return res.status(400).json({
      success: false,
      message: "user not authorized!",
    });
  }

  req.user = {
    _id: decodedToken._id,
    name: decodedToken.name,
  };

  next();
};

export default authentication;
