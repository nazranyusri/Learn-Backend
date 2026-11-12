import { AppError, Errors } from "#app/errors/index.js";
import { fetchTransactions } from "#app/repositories/index.js";

export async function getTransactions(userId) {
  if (!userId) {
    throw new AppError({
      ...Errors.UNPROCESSABLE_CONTENT,
      detail: "User ID is required.",
      errors: [{ field: "userId", message: "User ID is required." }],
    });
  }
  const transactions = await fetchTransactions(userId);
  return { transactions };
}
