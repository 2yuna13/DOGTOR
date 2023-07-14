import { Router } from "express";
import { logger } from "../../utils/winston";
import UserController from "../controllers/userController";

const userRouter = Router();

userRouter.post("/register", UserController.userRegisterController);

export { userRouter };
