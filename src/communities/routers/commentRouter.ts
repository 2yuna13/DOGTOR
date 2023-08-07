import { Router } from "express";
import { CommentController } from "../controllers/commentController";
import passport from "passport";
import validationMiddleware from "../../middlewares/validateDto";
import { CreateCommentDto, ReportCommentDto } from "../dtos/commentDto";

const commentRouter = Router();

commentRouter.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware(CreateCommentDto),
  CommentController.createComment
);

commentRouter.get("/comments/:postId", CommentController.getComments);

commentRouter.delete(
  "/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  CommentController.deleteComment
);

commentRouter.post(
  "/comments/report",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware(ReportCommentDto),
  CommentController.reportComment
);

export { commentRouter };
