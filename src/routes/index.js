import { Router } from 'express';
import {
	healthController,
} from '#app/controllers/index.js';
import { requireAuth } from '#app/middleware/auth.js';
import userRouter from './user.js';
import authRouter from './auth.js';

const router = Router();
router.get('/health', healthController);
router.use('/auth', authRouter);
router.use('/user', requireAuth, userRouter);

export default router;
