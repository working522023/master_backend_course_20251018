import { HttpExceptionOptions } from "../../common";

export class HttpException extends Error {
  public status: number;
  public code?: string;
  public details?: any;

  constructor(message = "Internal Server Error", options: HttpExceptionOptions = {}) {
    super(message);
    this.name = "HttpException";
    this.status = options.status ?? 500;
    this.code = options.code ?? (this.status === 500 ? "INTERNAL_SERVER_ERROR" : "ERROR");
    this.details = options.details;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class StorageException extends Error {
  public readonly code: string;
  public readonly details?: any;

  constructor(message: string, code = "STORAGE_ERROR", details?: any) {
    super(message);
    this.code = code;
    this.details = details;
  }
}


export class BadRequestException extends HttpException {
  constructor(message = "Bad Request", details?: any) {
    super(message, { status: 400, code: "BAD_REQUEST", details });
  }
}
export class NotFoundException extends HttpException {
  constructor(message = "Not Found", details?: any) {
    super(message, { status: 404, code: "NOT_FOUND", details });
  }
}

export class InputBadRequestException extends HttpException {
  constructor(message = "Invalid input", details?: any) {
    super(message, { status: 404, code: "INVALID_INPUT", details });
  }
}

export class ValidationException extends HttpException {
  constructor(message = "Validation", details?: any) {
    super(message, { status: 400, code: "VALIDATION", details });
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized", details?: any) {
    super(message, { status: 401, code: "UNAUTHORIZED", details });
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = "Forbidden", details?: any) {
    super(message, { status: 403, code: "FORBIDDEN", details });
  }
}

export class ConflictException extends HttpException {
  constructor(message = "Resource already exists", details?: any) {
    super(message, { status: 409, code: "CONFLICT", details });
  }
}

export class AlreadyException extends HttpException {
  constructor(message = "Resource already exists", details?: any) {
    super(message, { status: 409, code: "ALREADY", details });
  }
}

export class InternalServerException extends HttpException {
  constructor(message = "Internal server error", details?: any) {
    super(message, { status: 500, code: "INTERNAL_SERVER_ERROR", details });
  }
}

export class OKException extends HttpException {
  constructor(message = "OK", details?: any) {
    super(message, { status: 200, code: "OK", details });
  }
}
