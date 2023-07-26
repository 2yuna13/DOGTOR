import { logger } from "../../utils/winston";
import { UserService } from "../services/userService";
import { Request, Response } from "express";
import passport from "passport";
import { generateToken } from "../../middlewares/auth";

class UserController {
  static async userRegisterController(req: Request, res: Response) {
    try {
      await UserService.addUser(req.body);
      logger.info("회원가입 성공");
      return res.status(201).json({ message: "회원가입이 완료되었습니다." });
    } catch (error) {
      logger.error("회원가입 실패");
      res.status(500).json({ error });
    }
  }

  static async verifyCodeController(req: Request, res: Response) {
    try {
      const verification = await UserService.createVerificationCode(
        req.body.email
      );

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
      // 인증 코드 확인
      await UserService.verifyUserEmail(req.body);

      logger.info("인증 성공");
      res.status(200).json({ message: "인증이 완료되었습니다." });
    } catch (error) {
      logger.error("인증 실패");
      res.status(500).json({ error });
    }
  }

  static async userLoginController(req: Request, res: Response) {
    try {
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
            await UserService.loginUser(req.body);

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

  // login 필요
  static async userVetRegisterController(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "면허증 파일 미첨부" });
      }
      const newUser = await UserService.addVet(
        req.body,
        req.file.path,
        req.user as string
      );
      logger.info("수의사 등록 신청 성공");
      return res.status(201).json(newUser);
    } catch (error) {
      logger.error("수의사 등록 실패");
      res.status(500).json({ error });
    }
  }

  static async getUserController(req: Request, res: Response) {
    try {
      const user = await UserService.getUser(req.user as string);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default UserController;
