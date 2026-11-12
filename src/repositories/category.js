import { query } from "#app/db/pool.js";

export async function fetchCategories(userId) {
  const result = await query(
    `SELECT name, category_type, icon, color
     FROM categories
     WHERE is_active = TRUE
     AND deleted_at IS NULL
     AND (
        is_system = TRUE
        OR user_id = $1
     )
     ORDER BY category_type, name;`,
    [userId],
  );
  return result.rows ?? null;
}
