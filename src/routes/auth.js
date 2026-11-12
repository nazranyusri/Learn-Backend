import { Router } from "express";
import { registerController, loginController } from "#app/controllers/index.js";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

export default authRouter;
