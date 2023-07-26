import { Router } from "express";
import { PostController } from "../controllers/postController";
import { validateRequest } from "../middlewares/validateRequest";
import passport from "passport";
import validationMiddleware from "../../middlewares/validateDto";
import { CreatePostDto } from "../dtos/postDto";
const PostRouter = Router();

PostRouter.post(
  "/post/create",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware(CreatePostDto),
  PostController.createPost
);

export { PostRouter };
