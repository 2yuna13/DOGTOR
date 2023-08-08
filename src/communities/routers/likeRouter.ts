import { Router } from "express";
import passport from "passport";
import { LikeController } from "../controllers/likeController";
import validationMiddleware from "../../middlewares/validateDto";
import { CreateLikeDto } from "../dtos/likeDto";

const LikeRouter = Router();

LikeRouter.post(
  "/posts/:postId/like",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware(CreateLikeDto),
  LikeController.addLike
);

LikeRouter.get(
  "/posts/:postId/like",
  passport.authenticate("jwt", { session: false }),
  LikeController.getLikeCount
);

LikeRouter.delete(
  "/posts/:postId/like",
  passport.authenticate("jwt", { session: false }),
  LikeController.deleteLike
);

export { LikeRouter };
