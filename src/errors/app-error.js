export class AppError extends Error {
  constructor({
    code,
    statusCode,
    title,
    detail,
    errors,
    cause,
    expose = statusCode < 500,
  }) {
    super(detail, { cause });
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.title = title;
    this.detail = detail;
    this.errors = errors;
    this.expose = expose;
  }
}
