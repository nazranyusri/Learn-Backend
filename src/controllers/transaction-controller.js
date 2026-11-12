import { sendJson } from "#app/utils/index.js";
import { getTransactions } from "#app/services/index.js";

export async function getTransactionsController(request, response) {
  const result = await getTransactions(request.user.id);
  sendJson(response, 200, result);
}
