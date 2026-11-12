import { sendJson } from "#app/utils/index.js";
import {
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
} from "#app/services/index.js";

export async function getAccountsController(request, response) {
  const result = await getAccounts(request.user.id);
  sendJson(response, 200, result);
}

export async function getAccountByIdController(request, response) {
  const result = await getAccountById(
    request.user.id,
    request.params.accountId,
  );
  sendJson(response, 200, result);
}

export async function createAccountController(request, response) {
  const result = await createAccount(request.user.id, request.body ?? {});
  sendJson(response, 201, result);
}

export async function updateAccountController(request, response) {
  const result = await updateAccount(
    request.user.id,
    request.params.accountId,
    request.body ?? {},
  );
  sendJson(response, 200, result);
}

export async function deleteAccountController(request, response) {
  const result = await deleteAccount(request.user.id, request.params.accountId);
  sendJson(response, 200, result);
}
