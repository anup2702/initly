import express from 'express';
import dotenv from 'dotenv';
import { query, closePool } from './db.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.get('/health', async (_req, res) => {
  try {
    await query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const server = app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`);
});

const shutdown = async (signal) => {
  console.log(`Received ${signal}, shutting down.`);
  server.close(async (closeError) => {
    if (closeError) {
      console.error('Error during HTTP shutdown:', closeError);
    }
    try {
      await closePool();
    } catch (poolError) {
      console.error('Error closing PostgreSQL pool:', poolError);
    }
    process.exit(0);
  });
};

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    shutdown(signal).catch((error) => {
      console.error('Unhandled shutdown error:', error);
      process.exit(1);
    });
  });
});
