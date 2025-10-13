import { Pool } from 'pg';

let pool;

const getConnectionConfig = () => {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL
    };
  }

  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;

  if (!host || !port || !user || !database) {
    throw new Error('PostgreSQL configuration is incomplete.');
  }

  return {
    host,
    port: Number(port),
    user,
    password,
    database
  };
};

export const getPool = () => {
  if (!pool) {
    pool = new Pool(getConnectionConfig());
  }
  return pool;
};

export const query = async (text, params) => {
  const activePool = getPool();
  return activePool.query(text, params);
};

export const closePool = async () => {
  if (!pool) {
    return;
  }
  await pool.end();
  pool = undefined;
};
