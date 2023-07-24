import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { RequestHandler } from "express";

export default function validationMiddleware<T extends object>(
  type: { new (...args: any[]): T },
  skipMissingProperties = false
): RequestHandler {
  return async (req, res, next) => {
    const dtoInstance = plainToClass(type, req.body);
    try {
      const errors = await validate(dtoInstance, { skipMissingProperties });
      if (errors.length > 0) {
        const message = errors
          .map((error) => Object.values<string>(error.constraints!))
          .join(", ");
        throw message;
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  };
}
