import { Router } from "express";
import { logger } from "../../utils/winston";
import UserController from "../controllers/userController";

const userRouter = Router();

// 회원가입
userRouter.post("/register", UserController.userRegisterController);

// 이메일 인증번호 발송
userRouter.post("/verifyCode", UserController.verifyCodeController);

// 이메일 인증
userRouter.post("/verifyEmail", UserController.userVerifyController);

// 로그인
userRouter.post("/login", UserController.userLoginController);

export { userRouter };
