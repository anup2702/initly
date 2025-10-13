/* src/routes/routes.ts */
import { Router, Request, Response } from 'express';
import logger from '../services/logger';

const router = Router();

// Rott route
router.get('/', (req: Request, res: Response) => {
  logger.info('Home route accessed.');
  res.json({ message: 'Welcome to Express + TypeScript Initly Template!' });
});

// 404 handler
router.use((req: Request, res: Response) => {
  logger.info('Reached to an invalid route endpoint.');
  res.status(404).json({ error: 'Not Found' });
});

export default router;
