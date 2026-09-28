export function sendJson(response, statusCode, payload, headers = {}) {
  response.status(statusCode).set(headers).json(payload);
}

export function sendError(response, error, requestId, message) {
  const publicMessage = message ?? error.message;

  sendJson(response, error.statusCode, {
    error: {
      code: error.code,
      message: publicMessage,
      requestId,
    },
  });
}
