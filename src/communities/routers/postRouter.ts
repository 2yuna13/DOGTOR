import { Router } from "express";
import { PostController } from "../controllers/postController";
import passport from "passport";
import validationMiddleware from "../../middlewares/validateDto";
import {
  CreatePostDto,
  UpdatePostDto,
  ReportPostDto,
  LikePostDto,
} from "../dtos/postDto";

const PostRouter = Router();

PostRouter.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware(CreatePostDto),
  PostController.createPost
);

PostRouter.get("/posts", PostController.getPostsByCategory);

PostRouter.get(
  "/posts/:postId",
  passport.authenticate("jwt", { session: false }),
  PostController.getPostById
);

PostRouter.put(
  "/posts/:postId",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware(UpdatePostDto),
  PostController.updatePost
);

PostRouter.delete(
  "/posts/:postId",
  passport.authenticate("jwt", { session: false }),
  PostController.deletePost
);

PostRouter.post(
  "/posts/report",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware(ReportPostDto),
  PostController.reportPost
);

PostRouter.patch(
  "/posts/like",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware(LikePostDto),
  PostController.likePost
);

export { PostRouter };
