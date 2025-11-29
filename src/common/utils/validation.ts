import { Request } from "express";
import { validate } from "class-validator";
import { validationResult, ValidationChain } from "express-validator";
import { BadRequestException } from "../../core";
import { ValidationErrorDetail } from "../interfaces";

export const validateDto = async (dto: object): Promise<void> => {
  const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });

  if (errors.length > 0) {
    const details = errors.flatMap((err) =>
      Object.values(err.constraints || {}).map((message) => ({
        field: err.property,
        message,
      }))
    );

    throw new BadRequestException("Validation failed.", details);
  }
};

export const executeValidation = async (rules: ValidationChain[], req: Request): Promise<void> => {
  await Promise.all(rules.map((rule) => rule.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors: ValidationErrorDetail[] = errors.array().map((err: any) => ({
      field: err.param ?? "unknown",
      message: err.msg ?? "Validation error",
      value: err.value ?? null,
    }));

    throw new BadRequestException("The provided data does not meet validation requirements.", formattedErrors);
  }
};

export const sanitizeInput = (input: Record<string, any>): void => {
  Object.keys(input).forEach((key) => {
    const value = input[key];
    if (typeof value === "string") input[key] = value.trim();
  });
};
