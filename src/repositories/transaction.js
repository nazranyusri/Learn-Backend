import { query } from "#app/db/pool.js";

export async function fetchTransactions(userId) {
  const result = await query(`SELECT * FROM transactions WHERE user_id = $1`, [
    userId,
  ]);
  return result.rows ?? null;
}
