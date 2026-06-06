export class APIError extends Error {
  statusCode;

  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, APIError.prototype);
  }
}
