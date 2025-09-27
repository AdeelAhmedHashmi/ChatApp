import { Router } from "express";
import { Api } from "../config/settings/api";
import {
  getOtherUsersProfiles,
  getProfile as getProfileRoute,
  updateProfile as updateProfileRoute,
} from "../controllers/user.controller";
import authentication from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { updateProfileSchema } from "../utils/validationSchema/Schema.utils";
import logger from "../utils/logger.utils";

const userRouter = Router();

const { getProfile, updateProfile, getOthers } = Api.api.routes.user.endpoints;

userRouter.route(`/${getProfile.url}`).get(authentication, getProfileRoute);

userRouter
  .route(`/${updateProfile.url}`)
  .put(authentication, validate(updateProfileSchema), updateProfileRoute);

userRouter
  .route(`/${getOthers.url}`)
  .get(authentication, getOtherUsersProfiles);

logger(userRouter);
export default userRouter;
