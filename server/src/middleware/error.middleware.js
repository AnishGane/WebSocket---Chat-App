import { APIError } from "../utils/api-error.js";

export const errorHandler = (err, req, res, next) => {
  const isAPIError = err instanceof APIError;
  const statusCode = isAPIError ? err.statusCode : 500;
  const message = isAPIError ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
