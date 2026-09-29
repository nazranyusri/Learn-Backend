import jwt from 'jsonwebtoken';
import { env } from '#app/config/env.js';
import { AppError, Errors } from '#app/errors/index.js';

export function requireAuth(request, _response, next) {
  const authorization = request.get('Authorization');
  const [scheme, token] = authorization?.split(' ') ?? [];

  if (scheme !== 'Bearer' || !token || !env.jwtSecret) {
    next(new AppError(Errors.UNAUTHORIZED));
    return;
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);

    if (!payload.sub) {
      throw new Error('JWT subject is missing');
    }

    request.user = { id: payload.sub };
    next();
  } catch (error) {
    next(new AppError({ ...Errors.UNAUTHORIZED, cause: error }));
  }
}
