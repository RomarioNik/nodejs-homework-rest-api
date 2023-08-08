import express from "express";
import { schemas } from "../../models/user.js";
import {
  register,
  login,
  logout,
  current,
  subscription,
  updateAvatar,
  verifyEmail,
  resendVerifyToken,
} from "../../controllers/auth/index.js";
import validateBody from "../../decorators/validateBody.js";
import { authenticate, upload } from "../../middlewares/index.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(schemas.registerSchema), register);

usersRouter.get("/verify/:verificationToken", verifyEmail);

usersRouter.post(
  "/verify",
  validateBody(schemas.emailScheme),
  resendVerifyToken
);

usersRouter.post("/login", validateBody(schemas.loginSchema), login);

usersRouter.post("/logout", authenticate, logout);

usersRouter.get("/current", authenticate, current);

usersRouter.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  subscription
);

usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

export default usersRouter;
