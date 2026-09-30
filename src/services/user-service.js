import { AppError, Errors } from "#app/errors/index.js";
import {
  findUserById,
  updateUserDisplayName,
  findUserSettingsById,
  updateUserSettingsById,
} from "#app/repositories/index.js";

/**
    User Service
*/
export async function getUser(userId) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError(Errors.NOT_FOUND);
  }

  return {
    id: user.id,
    email: user.email,
    displayName: user.display_name,
    currencyCode: user.currency_code,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
}

export async function updateUser(userId, { displayName }) {
  if (typeof displayName !== "string" || displayName.trim().length === 0) {
    throw new AppError({
      ...Errors.UNPROCESSABLE_CONTENT,
      detail: "Display name is required.",
      errors: [{ field: "displayName", message: "Display name is required." }],
    });
  }

  const user = await updateUserDisplayName(userId, displayName.trim());

  if (!user) {
    throw new AppError(Errors.NOT_FOUND);
  }

  return {
    id: user.id,
    email: user.email,
    displayName: user.display_name,
    currencyCode: user.currency_code,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
}

/**
    User Settings Service
*/
export async function getUserSettings(userId) {
  const settings = await findUserSettingsById(userId);

  if (!settings) {
    throw new AppError(Errors.NOT_FOUND);
  }

  return {
    userId: settings.user_id,
    timezone: settings.timezone,
    weekStartsOn: settings.week_starts_on,
    createdAt: settings.created_at,
    updatedAt: settings.updated_at,
  };
}

export async function updateUserSettings(userId, { timezone, weekStartsOn }) {
  const settings = await updateUserSettingsById(
    userId,
    timezone?.trim(),
    weekStartsOn,
  );

  if (!settings) {
    throw new AppError(Errors.NOT_FOUND);
  }

  return {
    userId: settings.user_id,
    timezone: settings.timezone,
    weekStartsOn: settings.week_starts_on,
    createdAt: settings.created_at,
    updatedAt: settings.updated_at,
  };
}
