// eslint-disable-next-line max-classes-per-file
export class BaseError extends Error {
  private readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class UnAuthorized extends BaseError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnAuthorized.prototype);
  }
}

export class InternalError extends BaseError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}

export class DbConnectionError extends BaseError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DbConnectionError.prototype);
  }
}

export class RateLimitExceedError extends BaseError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, RateLimitExceedError.prototype);
  }
}
