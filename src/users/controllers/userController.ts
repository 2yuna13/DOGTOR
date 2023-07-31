import { logger } from "../../utils/winston";
import { UserService } from "../services/userService";
import { Request, Response } from "express";
import passport from "passport";
import { generateToken } from "../../middlewares/auth";
import { UserDto, VetDto } from "../dtos/userDto";

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
    } catch (error: any) {
      logger.error("인증 실패");
      res.status(500).json(error.message);
    }
  }

  static async userLoginController(req: Request, res: Response) {
    try {
      passport.authenticate(
        "local",
        { session: false },
        async (err: Error | null, token: any, info: any) => {
          try {
            if (err) {
              res.status(401).json(err.message);
            }
            if (info) {
              res.status(401).json(info.reason);
            }
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

  static async socialLoginController(req: Request, res: Response) {
    try {
      const token = generateToken(req.user);
      res.cookie("token", token, { httpOnly: false });

      return res.redirect("http://localhost:5173");
    } catch (error) {
      res.status(500).json({ error });
    }
  }

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
      logger.info("유저 조회 성공");
      res.status(200).json(user);
    } catch (error) {
      logger.error("유저 조회 실패");
      res.status(500).json({ error });
    }
  }

  static async setUserController(req: Request, res: Response) {
    try {
      const { password, nickname } = req.body;

      const img_path = req.file?.path || null;

      const updateUserFields: Partial<UserDto> = {};

      if (password) updateUserFields.password = password;
      if (nickname) updateUserFields.nickname = nickname;
      if (img_path) updateUserFields.img_path = img_path;

      const user = await UserService.setUser(
        req.user as string,
        updateUserFields
      );
      logger.info("유저 정보 수정 성공");
      res.status(200).json({ user });
    } catch (error) {
      logger.error("유저 정보 수정 실패");
      res.status(500).json({ error });
    }
  }

  static async setVetController(req: Request, res: Response) {
    try {
      const { hospital_name, description, region } = req.body;

      const updateUserFields: Partial<VetDto> = {};

      if (hospital_name) updateUserFields.hospitalName = hospital_name;
      if (description) updateUserFields.description = description;
      if (region) updateUserFields.region = region;

      const vet = await UserService.setVet(
        req.user as string,
        updateUserFields
      );
      logger.info("수의사 정보 수정 성공");
      res.status(200).json(vet);
    } catch (error) {
      logger.error("수의사 정보 수정 실패");
      res.status(500).json({ error });
    }
  }

  static async userPostListController(req: Request, res: Response) {
    try {
      const rowPerPage: number = 10;
      const currentPage = parseInt(req.query.currentPage as string) || 1;
      const { postList, totalPostsCnt } = await UserService.getUserPost(
        req.user as string,
        currentPage,
        rowPerPage
      );
      logger.info("게시글 목록 조회 성공");
      res.status(200).json({
        currentPage,
        totalPage: Math.ceil(totalPostsCnt / rowPerPage),
        data: postList,
      });
    } catch (error) {
      logger.error("게시글 목록 조회 실패");
      res.status(500).json({ error });
    }
  }

  static async deleteVetController(req: Request, res: Response) {
    try {
      await UserService.deleteVet(req.user as string);
      logger.info("수의사 삭제 성공");
      res.status(200).json({ message: "수의사 신청 내역이 삭제되었습니다." });
    } catch (error: any) {
      logger.error("수의사 삭제 실패");
      res.status(500).json(error.message);
    }
  }
}

export default UserController;
