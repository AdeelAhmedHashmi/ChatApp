import { Router } from "express";
import {
  login as loginRoute,
  signup as signupRoute,
  logout as logoutRoute,
} from "../controllers/auth.controller";
import { Api } from "../config/settings/api";
import authentication from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import {
  loginSchema,
  signupSchema,
} from "../utils/validationSchema/Schema.utils";
import logger from "../utils/logger.utils";

const { login, logout, signup } = Api.api.routes.authentication.endpoints;

const authRouter = Router();

authRouter.route(`/${login.url}`).post(loginRoute);
authRouter.route(`/${logout.url}`).post(authentication, logoutRoute);
authRouter.route(`/${signup.url}`).post(validate(signupSchema), signupRoute);

logger(authRouter);

export default authRouter;
