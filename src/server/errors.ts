export enum ErrorKind {
  FieldValidation = 400,
  Validation = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Internal = 500,
  NotImplemented = 501
}

export class AppError extends Error {
  public code: ErrorKind;
  public error: Error;

  constructor(code: ErrorKind, message: string, error?: Error) {
    super(message);
    this.code = code;
    this.error = error;
  }

  public toModel() {
    return {
      message: this.message
    };
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(ErrorKind.NotFound, message);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, error?: Error) {
    super(ErrorKind.Validation, message, error);
  }
}

export class FieldValidationError extends AppError {
  public fields: FieldError[];

  constructor(message: string, fields: FieldError[], error?: Error) {
    super(ErrorKind.Validation, message, error);
  }

  public toModel() {
    return {
      message: this.message,
      fields: this.fields
    };
  }
}

export class UnauthorizedError extends AppError {
  constructor(error?: Error) {
    super(ErrorKind.Unauthorized, "Unauthorized user", error);
  }
}

export class ForbiddenError extends AppError {
  constructor(error?: Error) {
    super(ErrorKind.Forbidden, "Permission denied", error);
  }
}

export interface FieldError {
  message: string;
  kind: string;
  path: string[];
}

export class NotImplementedError extends AppError {
  constructor() {
    super(ErrorKind.NotImplemented, "Not implemented");
  }
}
