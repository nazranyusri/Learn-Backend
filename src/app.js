import express from "express";
import { randomUUID } from "node:crypto";
import { applyCors } from "#app/middleware/cors.js";
import { env } from "#app/config/env.js";
import { AppError, Errors, normalizeError } from "#app/errors/index.js";
import routes from "#app/routes/index.js";
import { sendError } from "#app/utils/index.js";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use((request, response, next) => {
    // Header setting
    const incomingRequestId = request.get("X-Request-Id");
    const requestId = incomingRequestId?.slice(0, 128) || randomUUID();
    response.locals.requestId = requestId;
    response.setHeader("X-Request-Id", requestId);
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("X-Frame-Options", "DENY");
    applyCors(response);

    // CORS preflight
    if (request.method === "OPTIONS") {
      response.sendStatus(204);
      return;
    }

    // If all good, continue to the next middleware or route handler
    next();
  });

  // Route handler
  app.use(routes);

  // If no route found, send a 404 error
  app.use((_request, response) => {
    const error = new AppError(Errors.NOT_FOUND);
    sendError(response, error, response.locals.requestId);
  });

  // If request fails, error will be catch here
  app.use((error, request, response, next) => {
    const normalizedError = normalizeError(error);
    const requestId = response.locals.requestId;
    const publicError =
      normalizedError.expose || env.nodeEnv !== "production"
        ? normalizedError
        : new AppError(Errors.INTERNAL_SERVER_ERROR);

    console.error({
      error: {
        code: normalizedError.code,
        name: normalizedError.name,
        message: normalizedError.message,
        stack: normalizedError.stack,
        cause: normalizedError.cause,
      },
      method: request.method,
      path: request.originalUrl,
      requestId,
      statusCode: normalizedError.statusCode,
    });

    if (response.headersSent) {
      next(normalizedError);
      return;
    }

    sendError(response, publicError, requestId);
  });

  return app;
}
