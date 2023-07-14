import { logger } from "../../utils/winston";
import { userService } from "../services/userService";
import { Request, Response } from "express";
import { UserDto } from "../dtos/userDto";
import { validate } from "class-validator";

class UserController {
  static async userRegisterController(req: Request, res: Response) {
    try {
      const userDto = new UserDto(
        req.body.email,
        req.body.password,
        req.body.username
      );
      validate(userDto);

      const adduser = await userService.addUser(userDto);
      logger.info("회원가입 성공");
      res.status(201).json(adduser);
    } catch (error) {
      logger.error("회원가입 실패");
      res.status(500).json({ error });
    }
  }
}

export default UserController;
