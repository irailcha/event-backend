import express from "express";
import authController from "../controllers/auth-controller.js";
import { validateBody } from "../decorators/validateBody.js";
import {
  userSignupSchema,
  userSigninSchema,
  userRefreshTokenSchema,
} from "../models/User.js";
import { auth } from "../middlewares/auth.js";

const userRouter = express.Router();

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);
const userRefreshValidate = validateBody(userRefreshTokenSchema);

userRouter.post("/signup", userSignupValidate, authController.signup);

userRouter.post("/signin", userSigninValidate, authController.signin);

userRouter.post("/refresh", userRefreshValidate, authController.refresh);

userRouter.get("/current", auth, authController.getCurrent);

userRouter.post("/signout", auth, authController.signout);


export default userRouter;
