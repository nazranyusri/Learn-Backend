export function sendJson(response, statusCode, data, headers = {}) {
  response.status(statusCode).set(headers).json({
    status: statusCode,
    requestId: response.locals.requestId,
    data,
  });
}

export function sendError(response, error, requestId, detail) {
  const payload = {
    status: error.statusCode,
    requestId,
    title: error.title,
    detail: detail ?? error.detail,
    code: error.code,
    errors: error.errors ?? [],
  };

  response.status(error.statusCode).json(payload);
}
