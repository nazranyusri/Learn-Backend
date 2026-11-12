import { AppError, Errors } from "#app/errors/index.js";
import {
  fetchAccounts,
  fetchAccountByAccountId,
  createAccount as insertAccount,
  updateAnAccount,
  deleteAccount as deleteAnAccount,
} from "#app/repositories/index.js";

function validateAccountData(accountData) {
  if (!accountData || typeof accountData !== "object") {
    throw new AppError({
      ...Errors.UNPROCESSABLE_CONTENT,
      detail: "Account data is invalid.",
      errors: [{ field: "accountData", message: "Account data is required." }],
    });
  }

  const {
    name,
    account_type: accountType,
    opening_balance: openingBalance = 0,
    is_savings_account: isSavingsAccount = false,
  } = accountData;

  const errors = [];

  if (typeof name !== "string" || name.trim().length === 0) {
    errors.push({ field: "name", message: "Name is required." });
  } else if (name.trim().length > 100) {
    errors.push({
      field: "name",
      message: "Name must be 100 characters or fewer.",
    });
  }

  const accountTypes = ["BANK", "EWALLET", "CASH", "OTHER"];
  if (!accountTypes.includes(accountType)) {
    errors.push({
      field: "account_type",
      message: "Account type must be BANK, EWALLET, CASH, or OTHER.",
    });
  }

  const openingBalanceText = String(openingBalance).trim();
  if (
    (typeof openingBalance !== "number" &&
      typeof openingBalance !== "string") ||
    openingBalanceText === "" ||
    !/^-?\d{1,17}(?:\.\d{1,2})?$/.test(openingBalanceText)
  ) {
    errors.push({
      field: "opening_balance",
      message:
        "Opening balance must have up to 17 integer digits and 2 decimals.",
    });
  }

  if (typeof isSavingsAccount !== "boolean") {
    errors.push({
      field: "is_savings_account",
      message: "Savings account flag must be a boolean.",
    });
  }

  if (errors.length > 0) {
    throw new AppError({
      ...Errors.UNPROCESSABLE_CONTENT,
      detail: "Account data is invalid.",
      errors,
    });
  }

  return {
    name: name.trim(),
    accountType,
    openingBalance: openingBalanceText,
    isSavingsAccount,
  };
}

export async function getAccounts(userId) {
  if (!userId) {
    throw new AppError({
      ...Errors.UNPROCESSABLE_CONTENT,
      detail: "User ID is required.",
      errors: [{ field: "userId", message: "User ID is required." }],
    });
  }
  const accounts = await fetchAccounts(userId);
  return { accounts };
}

export async function getAccountById(userId, accountId) {
  if (!userId || !accountId) {
    throw new AppError({
      ...Errors.UNPROCESSABLE_CONTENT,
      detail: "User ID and Account ID are required.",
      errors: [
        { field: "userId", message: "User ID is required." },
        { field: "accountId", message: "Account ID is required." },
      ],
    });
  }

  const account = await fetchAccountByAccountId(userId, accountId);

  if (!account) {
    throw new AppError({
      ...Errors.NOT_FOUND,
      detail: "Account not found.",
      errors: [{ field: "accountId", message: "Account not found." }],
    });
  }
  return { account };
}

export async function createAccount(userId, accountData) {
  if (!userId) {
    throw new AppError({
      ...Errors.UNPROCESSABLE_CONTENT,
      detail: "User ID is required.",
      errors: [{ field: "userId", message: "User ID is required." }],
    });
  }

  const { name, accountType, openingBalance, isSavingsAccount } =
    validateAccountData(accountData);

  const account = await insertAccount(userId, {
    name,
    account_type: accountType,
    opening_balance: openingBalance,
    is_savings_account: isSavingsAccount,
  });

  if (!account) {
    throw new AppError({
      ...Errors.INTERNAL_SERVER_ERROR,
      detail: "Account could not be created.",
    });
  }

  return { account };
}

export async function updateAccount(userId, accountId, accountData) {
  if (!userId) {
    throw new AppError({
      ...Errors.UNPROCESSABLE_CONTENT,
      detail: "User ID is required.",
      errors: [{ field: "userId", message: "User ID is required." }],
    });
  }

  if (!accountId) {
    throw new AppError({
      ...Errors.UNPROCESSABLE_CONTENT,
      detail: "Account ID is required.",
      errors: [{ field: "accountId", message: "Account ID is required." }],
    });
  }

  const { name, accountType, openingBalance, isSavingsAccount } =
    validateAccountData(accountData);

  const account = await updateAnAccount(userId, accountId, {
    name,
    account_type: accountType,
    opening_balance: openingBalance,
    is_savings_account: isSavingsAccount,
  });

  if (!account) {
    throw new AppError({
      ...Errors.INTERNAL_SERVER_ERROR,
      detail: "Account could not be created.",
    });
  }

  return { account };
}

export async function deleteAccount(userId, accountId) {
  if (!userId || !accountId) {
    throw new AppError({
      ...Errors.UNPROCESSABLE_CONTENT,
      detail: "User ID and Account ID are required.",
      errors: [
        { field: "userId", message: "User ID is required." },
        { field: "accountId", message: "Account ID is required." },
      ],
    });
  }

  const account = await deleteAnAccount(userId, accountId);

  if (!account) {
    throw new AppError({
      ...Errors.NOT_FOUND,
      detail: "Account not found.",
      errors: [{ field: "accountId", message: "Account not found." }],
    });
  }
  return { account };
}
