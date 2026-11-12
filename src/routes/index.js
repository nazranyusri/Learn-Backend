import { Router } from "express";
import { healthController } from "#app/controllers/index.js";
import { requireAuth } from "#app/middleware/auth.js";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import accountRouter from "./account.js";
import categoryRouter from "./category.js";

const router = Router();
router.get("/api/v1/health", healthController);
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/user", requireAuth, userRouter);
router.use("/api/v1/account", requireAuth, accountRouter);
router.use("/api/v1/category", requireAuth, categoryRouter);

export default router;
