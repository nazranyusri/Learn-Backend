import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "#app/config/env.js";
import { AppError, Errors } from "#app/errors/index.js";
import {
  createUser,
  findUserForAuthentication,
} from "#app/repositories/index.js";

function createToken(userId) {
  if (!env.jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({}, env.jwtSecret, {
    subject: String(userId),
    expiresIn: env.jwtExpiresIn,
  });
}

function validateCredentials(email, password) {
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.trim().length === 0 ||
    password.length === 0
  ) {
    throw new AppError({
      ...Errors.UNPROCESSABLE_CONTENT,
      detail: "Email and password are required.",
      errors: [
        { field: "email", message: "Email is required." },
        { field: "password", message: "Password is required." },
      ],
    });
  }
}

export async function register({ email, password, displayName }) {
  validateCredentials(email, password);

  if (typeof displayName !== "string" || displayName.trim().length === 0) {
    throw new AppError({
      ...Errors.UNPROCESSABLE_CONTENT,
      detail: "Display name is required.",
      errors: [{ field: "displayName", message: "Display name is required." }],
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const user = await createUser(
      normalizedEmail,
      displayName.trim(),
      passwordHash,
    );

    return {
      accessToken: createToken(user.id),
      displayName: user.display_name,
    };
  } catch (error) {
    if (error.code === "23505") {
      throw new AppError({
        ...Errors.CONFLICT,
        title: "Email already in use",
        detail: "An account with this email is already registered.",
        errors: [
          { field: "email", message: "Email address is already in use." },
        ],
        cause: error,
      });
    }

    throw error;
  }
}

export async function login({ email, password }) {
  validateCredentials(email, password);

  const user = await findUserForAuthentication(email.trim().toLowerCase());
  const passwordMatches = user
    ? await bcrypt.compare(password, user.password_hash)
    : false;

  if (!passwordMatches) {
    throw new AppError(Errors.INVALID_CREDENTIALS);
  }

  return {
    accessToken: createToken(user.id),
  };
}
