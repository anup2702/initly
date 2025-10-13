/* src/controllers/health-check.ts */
import { Request, Response } from 'express';
import logger from '../services/logger';

const healthCheck = (req: Request, res: Response) => {
  logger.info('Health Check route got accessed.');
  res.status(200).json({ status: 'ok', message: 'Server is healthy!' });
};

export default healthCheck;
