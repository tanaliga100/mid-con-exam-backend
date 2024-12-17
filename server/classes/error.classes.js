class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Bad Request Error (400)
class BadRequest extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

// Unauthorized Error (401)
class Unauthorized extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

// Forbidden Error (403)
class Forbidden extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

// Not Found Error (404)
class NotFound extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

// Unprocessable Entity Error (422)
class UnprocessableEntity extends AppError {
  constructor(message = "Unprocessable Entity") {
    super(message, 422);
  }
}

module.exports = {
  AppError,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  UnprocessableEntity,
};
