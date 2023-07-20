import { logger } from "../../utils/winston";
import { UserService } from "../services/userService";
import { Request, Response } from "express";
import {
  UserDto,
  VerifyCodeDto,
  VerifyEmailDto,
  VerifyVetDto,
} from "../dtos/userDto";
import { validate } from "class-validator";

class UserController {
  static async userRegisterController(req: Request, res: Response) {
    try {
      const userDto = new UserDto(
        req.body.email,
        req.body.password,
        req.body.nickname
      );
      validate(userDto).then((errors) => {
        if (errors.length > 0) {
          const errorMessages = errors
            .map((error) => Object.values<string>(error.constraints!))
            .join(", ");
          return res
            .status(400)
            .json({ error: `유효성 검사 에러: ${errorMessages}` });
        } else {
          const newUser = UserService.addUser(userDto);
          logger.info("회원가입 성공");
          return res.status(201).json(newUser);
        }
      });
    } catch (error) {
      logger.error("회원가입 실패");
      res.status(500).json({ error });
    }
  }

  static async verifyCodeController(req: Request, res: Response) {
    try {
      const email = new VerifyCodeDto(req.body.email);

      await UserService.createVerificationCode(email);

      logger.info("이메일이 전송되었습니다.");
      res.status(200).json({ message: "이메일이 전송되었습니다." });
    } catch (error) {
      logger.error("이메일 전송 실패");
      res.status(500).json({ error });
    }
  }

  static async userVerifyController(req: Request, res: Response) {
    try {
      const verifyEmailDto = new VerifyEmailDto(req.body.email, req.body.code);

      // 인증 코드 확인
      await UserService.verifyUserEmail(verifyEmailDto);

      logger.info("인증 성공");
      res.status(200).json({ message: "인증이 완료되었습니다." });
    } catch (error) {
      logger.error("인증 실패");
      res.status(500).json({ error });
    }
  }

  static async userLoginController(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserService.getUser({ email, password });

      res.status(200).send({ message: "로그인 되었습니다.", user });
    } catch (error) {
      logger.error("로그인 실패");
      res.status(500).json({ error });
    }
  }

  // login 필요
  static async userVetRegisterController(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "면허증 파일 미첨부" });
      }
      const vetDto = new VerifyVetDto(
        //req.currentEmailId
        req.body.email, // 토큰에서 가져온 이메일
        req.body.name,
        req.body.hospitalName,
        req.body.description,
        req.file.path
      );
      const errors = await validate(vetDto);
      if (errors.length > 0) {
        const errorMessages = errors
          .map((error) => Object.values<string>(error.constraints!))
          .join(", ");
        return res
          .status(400)
          .json({ error: `유효성 검사 에러: ${errorMessages}` });
      } else {
        const newUser = await UserService.addVet(vetDto);
        logger.info("수의사 등록 신청 성공");
        return res.status(201).json(newUser);
      }
    } catch (error) {
      logger.error("수의사 등록 실패");
      res.status(500).json({ error });
    }
  }
}

export default UserController;
