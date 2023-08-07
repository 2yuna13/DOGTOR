import { CreateCommentDto, ReportCommentDto } from "../dtos/commentDto";
import { CommentRepository } from "../repositories/commentRepository";

class CommentService {
  static async createComment(commentDto: CreateCommentDto, userId: string) {
    try {
      const post = await CommentRepository.getCommentById(commentDto.post_id);
      if (!post) {
        throw new Error("게시물이 존재하지 않습니다.");
      }

      return await CommentRepository.createComment(commentDto, userId);
    } catch (error) {
      throw error;
    }
  }

  static async getCommentById(commentId: number) {
    try {
      return await CommentRepository.getCommentById(commentId);
    } catch (error) {
      throw error;
    }
  }

  static async deleteComment(commentId: number, author_email: string) {
    try {
      const comment = await CommentRepository.getCommentById(commentId);
      if (!comment) {
        throw new Error("댓글이 존재하지 않습니다.");
      }

      if (comment.author_email !== author_email) {
        throw new Error("댓글 삭제 권한이 없습니다.");
      }

      await CommentRepository.deleteComment(commentId);
    } catch (error) {
      throw error;
    }
  }

  static async reportComment(
    reportCommentDto: ReportCommentDto,
    userId: string
  ) {
    try {
      const { comment_id, reason } = reportCommentDto;

      const comment = await CommentRepository.getCommentById(comment_id);
      if (!comment) {
        throw new Error("댓글이 존재하지 않습니다.");
      }

      if (comment.author_email === userId) {
        throw new Error("자신의 댓글을 신고할 수 없습니다.");
      }

      return await CommentRepository.reportComment(reportCommentDto, userId);
    } catch (error) {
      throw error;
    }
  }
}

export { CommentService };
