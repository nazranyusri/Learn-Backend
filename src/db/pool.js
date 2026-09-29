import pg from 'pg';
import { env } from '#app/config/env.js';

const { Pool } = pg;

export const pool = new Pool({
  host: env.dbHost,
  user: env.dbUser,
  port: env.dbPort,
  password: env.dbPassword,
  database: env.dbDatabase,
});

pool.on('error', (error) => {
  console.error({
    error,
    message: 'Unexpected PostgreSQL idle client error',
  });
});

export function query(text, values) {
  return pool.query(text, values);
}

export async function checkDatabaseConnection() {
  await pool.query('SELECT 1');
}