function defineError(code, statusCode, title, detail) {
  return Object.freeze({ code, statusCode, title, detail });
}

export const Errors = Object.freeze({
  BAD_GATEWAY: defineError(
    "BAD_GATEWAY",
    502,
    "Bad gateway",
    "The upstream service returned an invalid response.",
  ),
  BAD_REQUEST: defineError(
    "BAD_REQUEST",
    400,
    "Invalid request",
    "The request could not be processed.",
  ),
  CONFLICT: defineError(
    "CONFLICT",
    409,
    "Conflict",
    "The request conflicts with the current state of the resource.",
  ),
  FORBIDDEN: defineError(
    "FORBIDDEN",
    403,
    "Access forbidden",
    "You do not have permission to perform this action.",
  ),
  GATEWAY_TIMEOUT: defineError(
    "GATEWAY_TIMEOUT",
    504,
    "Gateway timeout",
    "The upstream service did not respond in time.",
  ),
  SERVICE_UNAVAILABLE: defineError(
    "SERVICE_UNAVAILABLE",
    503,
    "Service unavailable",
    "The service is temporarily unavailable.",
  ),
  INTERNAL_SERVER_ERROR: defineError(
    "INTERNAL_SERVER_ERROR",
    500,
    "Something went wrong",
    "Please try again later.",
  ),
  INVALID_CREDENTIALS: defineError(
    "INVALID_CREDENTIALS",
    401,
    "Login failed",
    "The email or password is incorrect.",
  ),
  INVALID_UPSTREAM_RESPONSE: defineError(
    "INVALID_UPSTREAM_RESPONSE",
    502,
    "Invalid upstream response",
    "A dependent service returned an invalid response.",
  ),
  METHOD_NOT_ALLOWED: defineError(
    "METHOD_NOT_ALLOWED",
    405,
    "Method not allowed",
    "This HTTP method is not supported for this resource.",
  ),
  NOT_FOUND: defineError(
    "NOT_FOUND",
    404,
    "Not found",
    "The requested resource was not found.",
  ),
  PAYLOAD_TOO_LARGE: defineError(
    "PAYLOAD_TOO_LARGE",
    413,
    "Payload too large",
    "The request payload is too large.",
  ),
  REQUEST_TIMEOUT: defineError(
    "REQUEST_TIMEOUT",
    408,
    "Request timeout",
    "The request took too long to complete.",
  ),
  TOO_MANY_REQUESTS: defineError(
    "TOO_MANY_REQUESTS",
    429,
    "Too many requests",
    "Too many requests were made. Please try again later.",
  ),
  UNAUTHORIZED: defineError(
    "UNAUTHORIZED",
    401,
    "Authentication required",
    "Authentication is required to access this resource.",
  ),
  UNPROCESSABLE_CONTENT: defineError(
    "UNPROCESSABLE_CONTENT",
    422,
    "Validation error",
    "The provided input parameters are invalid.",
  ),
  UNSUPPORTED_MEDIA_TYPE: defineError(
    "UNSUPPORTED_MEDIA_TYPE",
    415,
    "Unsupported media type",
    "The request content type is not supported.",
  ),
});
