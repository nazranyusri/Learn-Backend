import { query } from "#app/db/pool.js";

export async function findUserForAuthentication(email) {
  const result = await query(
    `
      SELECT id, email, display_name, password_hash
      FROM users
      WHERE email = $1
        AND deleted_at IS NULL
    `,
    [email],
  );

  return result.rows[0] ?? null;
}

export async function createUser(email, displayName, passwordHash) {
  const result = await query(
    `
      INSERT INTO users (email, display_name, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, email, display_name
    `,
    [email, displayName, passwordHash],
  );

  return result.rows[0];
}

/**
    User Settings Repository
*/
export async function findUserById(userId) {
  const result = await query(
    `
      SELECT
        id,
        email,
        display_name,
        currency_code,
        created_at,
        updated_at
      FROM users
      WHERE id = $1
        AND deleted_at IS NULL
    `,
    [userId],
  );

  return result.rows[0] ?? null;
}

export async function updateUserDisplayName(userId, displayName) {
  const result = await query(
    `
      UPDATE users
      SET display_name = $2
      WHERE id = $1
        AND deleted_at IS NULL
      RETURNING
        id,
        email,
        display_name,
        currency_code,
        created_at,
        updated_at
    `,
    [userId, displayName],
  );

  return result.rows[0] ?? null;
}

/**
    User Settings Repository
*/
export async function findUserSettingsById(userId) {
  const result = await query(
    `
      SELECT
        user_id,
        timezone,
        week_starts_on,
        created_at,
        updated_at
      FROM user_settings
      WHERE user_id = $1
    `,
    [userId],
  );

  return result.rows[0] ?? null;
}

export async function updateUserSettingsById(userId, timezone, weekStartsOn) {
  const result = await query(
    `
      UPDATE user_settings
      SET
        timezone = COALESCE($2, timezone),
        week_starts_on = COALESCE($3, week_starts_on)
      WHERE user_id = $1
      RETURNING
        user_id,
        timezone,
        week_starts_on,
        created_at,
        updated_at
    `,
    [userId, timezone ?? null, weekStartsOn ?? null],
  );

  return result.rows[0] ?? null;
}
