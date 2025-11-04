import { ErrorDetail } from "../../common";

export class BaseException<T extends ErrorDetail = ErrorDetail> extends Error {
  public readonly statusCode: number;
  public readonly errors?: T[];
  public readonly timestamp: string;
  public readonly correlationId?: string;

  constructor(message: string, statusCode: number, errors?: T[], correlationId?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;
    this.correlationId = correlationId;
    this.timestamp = new Date().toISOString();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors,
      timestamp: this.timestamp,
      correlationId: this.correlationId,
    };
  }
}

export class BadRequestException extends BaseException {
  constructor(message = 'Bad request', errors?: ErrorDetail[], correlationId?: string) {
    super(message, 400, errors, correlationId);
  }
}

export class InputBadRequestException extends BadRequestException {
  constructor(message = 'Invalid input', errors?: ErrorDetail[], correlationId?: string) {
    super(message, errors, correlationId);
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message = 'Unauthorized', errors?: ErrorDetail[], correlationId?: string) {
    super(message, 401, errors, correlationId);
  }
}

export class ForbiddenException extends BaseException {
  constructor(message = 'Forbidden', errors?: ErrorDetail[], correlationId?: string) {
    super(message, 403, errors, correlationId);
  }
}

export class NotFoundException extends BaseException {
  constructor(message = 'Resource not found', errors?: ErrorDetail[], correlationId?: string) {
    super(message, 404, errors, correlationId);
  }
}

export class ConflictException extends BaseException {
  constructor(message = 'Resource already exists', errors?: ErrorDetail[], correlationId?: string) {
    super(message, 409, errors, correlationId);
  }
}

export class AlreadyException extends ConflictException {
  constructor(message = 'Resource already exists', errors?: ErrorDetail[], correlationId?: string) {
    super(message, errors, correlationId);
  }
}

export class InternalServerException extends BaseException {
  constructor(message = 'Internal server error', correlationId?: string) {
    super(message, 500, undefined, correlationId);
  }
}

export class OKException extends BaseException {
  constructor(message = 'OK', correlationId?: string) {
    super(message, 200, undefined, correlationId);
  }
}
