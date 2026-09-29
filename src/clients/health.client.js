import { AppError, Errors } from '#app/errors/index.js';

export async function fetchHealth(endpoint) {
  let response;

  try {
    response = await fetch(endpoint);
  } catch (error) {
    throw new AppError({
      cause: error,
      ...Errors.SERVICE_UNAVAILABLE,
    });
  }

  let body;

  try {
    body = await response.json();
    console.log('body', body);
  } catch (error) {
    throw new AppError({
      cause: error,
      ...Errors.INVALID_UPSTREAM_RESPONSE,
    });
  }

  return {
    body,
    statusCode: response.status,
  };
}