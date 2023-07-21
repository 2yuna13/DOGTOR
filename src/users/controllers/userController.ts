import { logger } from "../../utils/winston";
import { UserService } from "../services/userService";
import { Request, Response } from "express";
import {
  UserDto,
  UserLoginDto,
  VerifyCodeDto,
  VerifyEmailDto,
  VerifyVetDto,
} from "../dtos/userDto";
import { validate } from "class-validator";
import passport from "passport";
import { generateToken } from "../../utils/auth";

class UserController {
  static async userRegisterController(req: Request, res: Response) {
    try {
      const userDto = new UserDto(
        req.body.email,
        req.body.password,
        req.body.nickname
      );
      const errors = await validate(userDto);

      if (errors.length > 0) {
        const errorMessages = errors
          .map((error) => Object.values<string>(error.constraints!))
          .join(", ");
        logger.error("유효성 검사 에러");
        return res
          .status(400)
          .json({ error: `유효성 검사 에러: ${errorMessages}` });
      } else {
        await UserService.addUser(userDto);
        logger.info("회원가입 성공");
        return res.status(201).json({ message: "회원가입이 완료되었습니다." });
      }
    } catch (error) {
      logger.error("회원가입 실패");
      res.status(500).json({ error });
    }
  }

  static async verifyCodeController(req: Request, res: Response) {
    try {
      const email = new VerifyCodeDto(req.body.email);
      const verification = await UserService.createVerificationCode(email);

      if (verification === null) {
        res.status(400).json({ message: "이미 존재하는 이메일입니다. " });
      } else {
        logger.info("이메일 전송");
        res.status(200).json({ message: "이메일이 전송되었습니다." });
      }
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
      const userLoginDto = new UserLoginDto(req.body.email, req.body.password);

      // DTO 유효성 검사
      const errors = await validate(userLoginDto);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      passport.authenticate(
        "local",
        { session: false },
        async (err: Error | null, user: any, info: any) => {
          try {
            if (err || !user) {
              return res
                .status(400)
                .json({ error: info ? info.message : "로그인 실패" });
            }

            const token = generateToken(user);

            // 인증된 사용자 정보를 이용하여 로그인 후 로직을 처리
            await UserService.loginUser(userLoginDto);

            logger.info("로그인 성공");
            return res.status(200).json(token);
          } catch (error) {
            return res.status(500).json({ error });
          }
        }
      )(req, res);
    } catch (error) {
      logger.error("로그인 실패");
      res.status(500).json({ error });
    }
  }

  static async googleLoginController(req: Request, res: Response) {
    try {
      const token = generateToken(req.user);

      res.status(200).json(token);
    } catch (error) {
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
