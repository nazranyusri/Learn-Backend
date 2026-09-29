import process from 'node:process';
import { fetchHealth } from '#app/clients/health.client.js';
import { api } from '#app/constants/api.js';
import { AppError, Errors } from '#app/errors/index.js';

export async function getHealth() {
  const upstreamResponse = await fetchHealth(api.health);

  if (
    !upstreamResponse
    || !Number.isInteger(upstreamResponse.statusCode)
    || upstreamResponse.statusCode < 100
    || upstreamResponse.statusCode > 599
  ) {
    throw new AppError(Errors.INVALID_UPSTREAM_RESPONSE);
  }

  return {
    statusCode: upstreamResponse.statusCode,
    body: {
      service: 'learn-backend',
      status: 'ok',
      uptime: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    },
  };
}
