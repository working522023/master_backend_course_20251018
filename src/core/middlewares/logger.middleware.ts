import { NextFunction, Request, Response } from "express";
import { logger } from "../configs/logger";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.requestId || "unknown";

  // Child logger for this specific request
  req.logger = logger.child({ requestId });

  req.logger.info("Incoming request", {
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
  });

  next();
};
