import { env } from "#app/config/env.js";

export function applyCors(response) {
  response.setHeader("Access-Control-Allow-Origin", env.corsOrigin);
  response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Request-Id",
  );
}
