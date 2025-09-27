import { Router } from "express";
import { Api } from "../config/settings/api";
import {
  getMessage as getMessageRoute,
  sendMessage as sendMessageRoute,
} from "../controllers/message.controller";
import authentication from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { sendMessageSchema } from "../utils/validationSchema/Schema.utils";

const { send, get } = Api.api.routes.message.endpoints;

const messageRouter = Router();

messageRouter
  .route(`/${send.url}/:recieverId`)
  .post(authentication, validate(sendMessageSchema), sendMessageRoute);

messageRouter
  .route(`/${get.url}/:partnerId`)
  .post(authentication, getMessageRoute);

export default messageRouter;
