export class AppError extends Error {
  constructor({ code, statusCode, message, cause, expose = statusCode < 500 }) {
    super(message, { cause });
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.expose = expose;
  }
}