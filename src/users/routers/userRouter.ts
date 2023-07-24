import { Router } from "express";
import { logger } from "../../utils/winston";
import UserController from "../controllers/userController";
import upload from "../../utils/upload";

const userRouter = Router();

// 회원가입
userRouter.post("/register", UserController.userRegisterController);

// 이메일 인증번호 발송
userRouter.post("/verify-code", UserController.verifyCodeController);

// 이메일 인증
userRouter.post("/verify-email", UserController.userVerifyController);

// 로그인
userRouter.post("/login", UserController.userLoginController);

// 수의자 등록 신청
userRouter.post(
  "/user/vet-register",
  upload.single("vets"),
  UserController.userVetRegisterController
);
export { userRouter };
