import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { CreatePostDto, UpdatePostDto } from "../dtos/postDto";

const validateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let dto;
    if (req.method === "POST") {
      const { title, content } = req.body;
      dto = new CreatePostDto(title, content);
    } else if (req.method === "PUT") {
      const { title, content } = req.body;
      dto = new UpdatePostDto(title, content);
    } else {
      return next();
    }

    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values<string>(error.constraints!))
        .join(", ");
      return res
        .status(400)
        .json({ error: `유효성 검사 에러: ${errorMessages}` });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ error: "유효성 검사 실패" });
  }
};

export { validateRequest };
