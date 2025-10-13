/* srx/index.ts */
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import logger from './services/logger';
import routes from './routes/routes';
import healthRoute from './routes/health';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// HTTP request logging
app.use(morgan('dev', { stream: { write: (msg) => logger.info(msg.trim()) } }));

// Main routes
app.use('/', routes);

// Health Route
app.use('/health', healthRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
