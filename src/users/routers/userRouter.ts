import { Router } from "express";
import { logger } from "../../utils/winston";
import UserController from "../controllers/userController";
import upload from "../../middlewares/upload";
import validationMiddleware from "../../middlewares/validateDto";
import {
  UserDto,
  UserLoginDto,
  VerifyCodeDto,
  VerifyEmailDto,
  VerifyVetDto,
} from "../dtos/userDto";

const userRouter = Router();

// 회원가입
userRouter.post(
  "/users/register",
  validationMiddleware(UserDto),
  UserController.userRegisterController
);

// 이메일 인증번호 발송
userRouter.post(
  "/users/send-verify-code",
  validationMiddleware(VerifyCodeDto),
  UserController.verifyCodeController
);

// 이메일 인증
userRouter.delete(
  "/users/verify-email",
  validationMiddleware(VerifyEmailDto),
  UserController.userVerifyController
);

// 로그인
userRouter.post(
  "/users/login",
  validationMiddleware(UserLoginDto),
  UserController.userLoginController
);

// 수의자 등록 신청
userRouter.post(
  "/users/vet-register",
  upload.single("vets"),
  validationMiddleware(VerifyVetDto),
  UserController.userVetRegisterController
);
export { userRouter };
