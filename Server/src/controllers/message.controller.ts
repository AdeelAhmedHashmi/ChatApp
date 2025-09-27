import mongoose from "mongoose";
import { AuthHandler } from "../middlewares/auth.middleware";
import asyncHandler from "../utils/asyncHandler.utils";
import { Response } from "express";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import { success } from "zod";

const sendMessage = asyncHandler(async (req: AuthHandler, res: Response) => {
  const { message } = req.body.data;
  const senderId = req.user?._id;
  const recieverId = req.params.recieverId;

  console.log(req.body, req.user);
  const isRecieverIdValid = mongoose.Types.ObjectId.isValid(recieverId);

  if (!isRecieverIdValid) {
    res.status(400).json({
      success: false,
      message: "recieverId is not valid!",
    });
  }

  console.log("1.ok");
  let conversation = await Conversation.findOne({
    participants: { $all: [recieverId, senderId] },
  });

  console.log("2.ok");
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, recieverId],
    });
  }

  const newMessage = await Message.create({
    receiverId: recieverId,
    senderId: senderId,
    message: message,
  });

  if (!newMessage)
    return res.status(500).json({
      success: false,
      message: "Error while sending the message!",
    });

  conversation.messages.push(newMessage._id);
  await conversation.save();

  res.status(200).json({
    success: true,
    message: "user successfully send message!",
    data: newMessage,
  });
});

const getMessage = asyncHandler(async (req: AuthHandler, res: Response) => {
  const userId = req.user?._id;
  const partnerId = req.params.partnerId;

  const conversation = await Conversation.findOne({
    participants: { $all: [userId, partnerId] },
  })
    .populate("messages")
    .select("-__v");

  if (!conversation) {
    res.status(404).json({
      success: true,
      message: "Conversation not found!",
    });
  }

  res.status(200).json({
    success: true,
    message: "conversation found successfully!",
    data: conversation,
  });
});

export { sendMessage, getMessage };
