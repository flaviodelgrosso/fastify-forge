interface HttpErrorParams {
  statusCode: number;
  message: string;
  error: string;
}

abstract class HttpError extends Error {
  public statusCode: number;
  public error: string;

  constructor({ statusCode, message, error }: HttpErrorParams) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.name = 'HttpError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super({ statusCode: 404, message, error: 'Not Found' });
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super({ statusCode: 403, message, error: 'Forbidden' });
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super({ statusCode: 401, message, error: 'Unauthorized' });
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super({ statusCode: 400, message, error: 'Bad Request' });
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super({ statusCode: 500, message, error: 'Internal Server Error' });
  }
}
