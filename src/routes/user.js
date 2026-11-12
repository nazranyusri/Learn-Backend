import { Router } from "express";
import {
  getUserController,
  updateUserController,
  getUserSettingsController,
  updateUserSettingsController,
} from "#app/controllers/index.js";

const userRouter = Router();

userRouter.get("/", getUserController);
userRouter.patch("/", updateUserController);

userRouter.get("/settings", getUserSettingsController);
userRouter.patch("/settings", updateUserSettingsController);

export default userRouter;
