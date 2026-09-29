import { Router } from 'express';
import { healthController } from '#app/controllers/index.js';
import userRouter from './user.js';

const router = Router();
router.get('/health', healthController);
router.use('/user', userRouter);

export default router;
