export enum ErrorKind {
  Internal = 10000,
  NotFound = 20000,
  Validation = 30000,
  FieldValidation = 30001,
  Unauthorized = 30002,
  Permission = 30003
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
      code: this.code,
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
      code: this.code,
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

export class PermissionError extends AppError {
  constructor(error?: Error) {
    super(ErrorKind.Permission, "Permission denied", error);
  }
}

export interface FieldError {
  message: string;
  kind: string;
  path: string[];
}
