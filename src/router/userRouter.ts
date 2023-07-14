import { Router, Request, Response } from "express";
import { logger } from "../utils/winston";
import { userService } from "../service/userService";

const userRouter = Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const emailId: string = req.body.emailId;
    const password: string = req.body.password;
    const username: string = req.body.username;
    await userService.addUser(emailId, password, username);
    logger.info("회원가입 성공");
    res.status(201).json("회원가입 성공");
  } catch (error) {
    logger.error("회원가입 실패");
    res.status(500).json({ error });
  }
});

export { userRouter };
