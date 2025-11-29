import { NextFunction } from "express";
import {
  BadRequestException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  InternalServerException,
  logger,
} from "../../core";

export const handleErrors = (error: any, next: NextFunction, context?: string): void => {
  const correlationId = (error?.correlationId as string) || (global as any).correlationId;

  const safeMessage = error instanceof Error ? error.message : "Unexpected issue occurred.";

  logger.error({
    message: safeMessage,
    context: context || "UnknownContext",
    correlationId,
    name: error.name,
    stack: error.stack,
    statusCode: error.statusCode || 500,
  });

  if ([BadRequestException, NotFoundException, UnauthorizedException, ConflictException].some(e => error instanceof e)) {
    return next(error);
  }

  return next(new InternalServerException("Unexpected issue occurred. Please try again later."));
};
