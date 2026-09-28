import { Router } from 'express';
import { healthController } from '#app/controllers/index.js';

const router = Router();
router.get('/health', healthController);

export default router;
