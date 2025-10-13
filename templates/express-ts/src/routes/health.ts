/* src/routes/health.ts */
import { Router, Request, Response } from 'express';
import healthCheck from '../controllers/health-check';

const router = Router();

// Health Route
router.get('/', healthCheck);

export default router;
