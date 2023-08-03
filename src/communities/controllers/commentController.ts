import { Request, Response } from "express";
import { CommentService } from "../services/commentService";
import { CreateCommentDto, ReportCommentDto } from "../dtos/commentDto";

class CommentController {
  static async createComment(req: Request, res: Response) {
    try {
      const userId = req.user as string;
      const { post_id, body } = req.body;

      const createCommentDto = new CreateCommentDto(post_id, body);
      const newComment = await CommentService.createComment(
        createCommentDto,
        userId
      );

      return res.status(201).json(newComment);
    } catch (error) {
      return res.status(500).json({ error: "댓글 작성 실패" });
    }
  }

  static async deleteComment(req: Request, res: Response) {
    try {
      const userId = req.user as string;
      const { commentId } = req.params;

      await CommentService.deleteComment(Number(commentId), userId);

      return res.status(200).json({ message: "댓글 삭제 성공" });
    } catch (error) {
      return res.status(500).json({ error: "댓글 삭제 실패" });
    }
  }
  static async reportComment(req: Request, res: Response) {
    try {
      const userId = req.user as string;
      const { comment_id, reason } = req.body;

      const reportCommentDto = new ReportCommentDto(comment_id, reason);
      await CommentService.reportComment(reportCommentDto, userId);

      return res.status(200).json({ message: "댓글 신고 성공" });
    } catch (error) {
      return res.status(500).json({ error: "댓글 신고 실패" });
    }
  }
}

export { CommentController };
