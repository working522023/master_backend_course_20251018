import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http.exception";
import { logger } from "../configs/logger";

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = req.requestId || "unknown";
  const log = req.logger || logger;

  const status = err instanceof HttpException ? err.status : 500;

  log.error("Unhandled error", {
    requestId,
    method: req.method,
    path: req.originalUrl,
    status,
    message: err.message,
    stack: err.stack,
  });

  res.status(status).json({
    success: false,
    requestId,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    message: err.message || "Internal Server Error",
    code: err.code || "INTERNAL_ERROR",
  });
};
