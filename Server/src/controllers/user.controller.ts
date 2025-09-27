import { AuthHandler } from "../middlewares/auth.middleware";
import User from "../models/user.model";
import asyncHandler from "../utils/asyncHandler.utils";
import { Response, NextFunction } from "express";

const getProfile = asyncHandler(
  async (req: AuthHandler, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?._id).select("-password -__v");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "error while getting user data!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user found!",
      data: user,
    });
  }
);

const updateProfile = asyncHandler(
  async (req: AuthHandler, res: Response, next: NextFunction) => {
    const { data } = req.body;

    await User.findByIdAndUpdate(req.user?._id, data);
    const updatedUser = await User.findById(req.user?._id);

    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        message: "error while updating user profile!",
      });
    }

    res.status(200).json({
      success: true,
      message: "user profile updated successfully!",
      data: updatedUser,
    });
  }
);

const getOtherUsersProfiles = asyncHandler(
  async (req: AuthHandler, res: Response) => {
    function checkIsSuccessFull(users: {}) {
      if (!users) {
        return res.status(400).json({
          success: false,
          message: "error while fetching user profiles",
        });
      }
    }

    if (!req.query.all) {
      const limit = Number(req.query.limit) || 10;
      const page = Number(req.query.page) || 1;
      const skip = (page - 1) * limit;

      const total = await User.countDocuments();
      const totalPage = Math.floor(total / limit);
      const users = await User.find({
        _id: {
          $ne: req.user?._id,
        },
      })
        .select("-password -__v -updatedAt")
        .skip(skip)
        .limit(limit);

      checkIsSuccessFull(users);

      res.status(200).json({
        success: true,
        message: "users fetch successfully!",
        data: {
          meta: {
            currentPage: page,
            totalPage: totalPage,
            itemPerPage: limit,
            totalItem: total - 1,
          },
          users,
        },
      });
    } else {
      const users = await User.find({
        _id: {
          $ne: req.user!._id,
        },
      }).select("-password -__v -updatedAt");

      checkIsSuccessFull(users);

      res.status(200).json({
        success: true,
        message: "users fetch successfully!",
        data: users,
      });
    }
  }
);
export { getProfile, updateProfile, getOtherUsersProfiles };
