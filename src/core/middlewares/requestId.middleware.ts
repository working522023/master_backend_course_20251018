import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

/**
 * RequestId middleware:
 * - generate or reuse request id from header `x-request-id`
 * - attach to req.requestId and res.locals.requestId
 * - set response header X-Request-Id
 */
export const requestIdMiddleware = (headerName = "x-request-id") => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const headerValue = (req.headers[headerName] as string) || req.headers["x-request-id"] as string | undefined;
      const id = headerValue && typeof headerValue === "string" && headerValue.trim().length > 0
        ? headerValue
        : randomUUID();

      req.requestId = id;
      res.setHeader("X-Request-Id", id);
      res.locals.requestId = id;

      // Optionally add a lightweight logger placeholder so other middlewares can attach real logger
      // req.logger = createChildLogger({ requestId: id }) // do this after logger middleware
      next();
    } catch (err) {
      next(err);
    }
  };
};
