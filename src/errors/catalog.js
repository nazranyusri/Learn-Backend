function defineError(code, statusCode, message) {
  return Object.freeze({ code, statusCode, message });
}

export const Errors = Object.freeze({
  BAD_GATEWAY: defineError('BAD_GATEWAY', 502, 'Bad gateway'),
  BAD_REQUEST: defineError('BAD_REQUEST', 400, 'Bad request'),
  CONFLICT: defineError('CONFLICT', 409, 'Conflict'),
  FORBIDDEN: defineError('FORBIDDEN', 403, 'Forbidden'),
  GATEWAY_TIMEOUT: defineError('GATEWAY_TIMEOUT', 504, 'Gateway timeout'),
  SERVICE_UNAVAILABLE: defineError(
    'SERVICE_UNAVAILABLE',
    503,
    'Service unavailable',
  ),
  INTERNAL_SERVER_ERROR: defineError(
    'INTERNAL_SERVER_ERROR',
    500,
    'Internal server error',
  ),
  INVALID_CREDENTIALS: defineError(
    'INVALID_CREDENTIALS',
    401,
    'Invalid email or password',
  ),
  INVALID_UPSTREAM_RESPONSE: defineError(
    'INVALID_UPSTREAM_RESPONSE',
    502,
    'Invalid health API response',
  ),
  METHOD_NOT_ALLOWED: defineError('METHOD_NOT_ALLOWED', 405, 'Method not allowed'),
  NOT_FOUND: defineError('NOT_FOUND', 404, 'Not found'),
  PAYLOAD_TOO_LARGE: defineError('PAYLOAD_TOO_LARGE', 413, 'Payload too large'),
  REQUEST_TIMEOUT: defineError('REQUEST_TIMEOUT', 408, 'Request timeout'),
  TOO_MANY_REQUESTS: defineError('TOO_MANY_REQUESTS', 429, 'Too many requests'),
  UNAUTHORIZED: defineError('UNAUTHORIZED', 401, 'Authentication required'),
  UNPROCESSABLE_CONTENT: defineError(
    'UNPROCESSABLE_CONTENT',
    422,
    'Unprocessable content',
  ),
  UNSUPPORTED_MEDIA_TYPE: defineError(
    'UNSUPPORTED_MEDIA_TYPE',
    415,
    'Unsupported media type',
  ),
});

