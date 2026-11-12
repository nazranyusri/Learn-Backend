import { AppError, Errors } from "#app/errors/index.js";
import { fetchCategories } from "#app/repositories/index.js";

export async function getCategories(userId) {
  if (!userId) {
    throw new AppError({
      ...Errors.UNPROCESSABLE_CONTENT,
      detail: "User ID is required.",
      errors: [{ field: "userId", message: "User ID is required." }],
    });
  }
  const categories = await fetchCategories(userId);
  return { categories };
}
