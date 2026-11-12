import { query } from "#app/db/pool.js";

export async function fetchAccounts(userId) {
  const result = await query(
    `SELECT id, name, account_type, opening_balance, updated_at, is_savings_account FROM accounts WHERE user_id = $1 AND is_active = TRUE`,
    [userId],
  );
  return result.rows;
}

export async function fetchAccountByAccountId(userId, accountId) {
  const result = await query(
    `SELECT id, name, account_type, opening_balance, updated_at, is_savings_account FROM accounts WHERE user_id = $1 AND id = $2`,
    [userId, accountId],
  );
  return result.rows[0] ?? null;
}

export async function createAccount(userId, accountData) {
  const { name, account_type, opening_balance, is_savings_account } =
    accountData;

  const result = await query(
    `INSERT INTO accounts
      (user_id, name, account_type, opening_balance, is_savings_account)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING name`,
    [userId, name, account_type, opening_balance, is_savings_account],
  );
  return result.rows[0];
}

export async function updateAnAccount(userId, accountId, accountData) {
  const { name, account_type, opening_balance, is_savings_account } =
    accountData;

  const result = await query(
    `UPDATE accounts
     SET name = $1,
         account_type = $2,
         opening_balance = $3,
         is_savings_account = $4
     WHERE user_id = $5 AND id = $6
     RETURNING *`,
    [
      name,
      account_type,
      opening_balance,
      is_savings_account,
      userId,
      accountId,
    ],
  );
  return result.rows[0];
}

export async function deleteAccount(userId, accountId) {
  const result = await query(
    `UPDATE accounts
     SET
       deleted_at = NOW(),
       is_active = FALSE
     WHERE id = $1
     AND user_id = $2
     AND deleted_at IS NULL
     RETURNING *`,
    [accountId, userId],
  );
  return result.rows[0] ?? null;
}
