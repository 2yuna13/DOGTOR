import { Router } from "express";
import { logger } from "../../utils/winston";
import UserController from "../controllers/userController";
import upload from "../../utils/upload";
import passport from "../../utils/passport";

const userRouter = Router();

// 회원가입
userRouter.post("/register", UserController.userRegisterController);

// 이메일 인증번호 발송
userRouter.post("/verifyCode", UserController.verifyCodeController);

// 이메일 인증
userRouter.post("/verifyEmail", UserController.userVerifyController);

// 로그인
userRouter.post("/login", UserController.userLoginController);

// 구글 로그인
userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  UserController.googleLoginController
);

// 수의자 등록 신청
userRouter.post(
  "/user/vetregister",
  upload.single("vets"),
  UserController.userVetRegisterController
);
export { userRouter };
