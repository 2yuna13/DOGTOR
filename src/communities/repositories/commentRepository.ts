import { PrismaClient, comments, report_comments } from "@prisma/client";
import { CreateCommentDto, ReportCommentDto } from "../dtos/commentDto";

const prisma = new PrismaClient();

class CommentRepository {
  static async getCommentById(commentId: number): Promise<comments | null> {
    try {
      return await prisma.comments.findUnique({
        where: { id: commentId },
      });
    } catch (err) {
      throw err;
    }
  }

  static async createComment(
    commentDto: CreateCommentDto,
    userId: string
  ): Promise<comments> {
    try {
      const commentData = {
        ...commentDto,
        group: 0,
        order: 0,
        indent: 0,
        author_email: userId,
      };

      const comment = await prisma.comments.create({
        data: commentData,
      });

      return comment;
    } catch (err) {
      throw err;
    }
  }

  static async deleteComment(commentId: number): Promise<comments> {
    try {
      const deletedComment = await prisma.comments.delete({
        where: { id: commentId },
      });
      return deletedComment;
    } catch (err) {
      throw err;
    }
  }

  static async reportComment(
    reportCommentDto: ReportCommentDto,
    author_email: string
  ): Promise<{ report: report_comments; report_comments: report_comments }> {
    try {
      const { comment_id, reason } = reportCommentDto;

      const existingComment = await prisma.comments.findUnique({
        where: { id: comment_id },
        select: { author_email: true },
      });

      if (!existingComment) {
        throw new Error("댓글이 존재하지 않습니다.");
      }

      if (existingComment.author_email === author_email) {
        throw new Error("자신의 댓글을 신고할 수 없습니다.");
      }

      const report = await prisma.reports.create({
        data: {
          author_email,
          content: reason,
        },
      });

      const reportComment = await prisma.report_comments.create({
        data: {
          comment_id,
          report_id: report.id,
        },
      });

      return { report, report_comments: reportComment };
    } catch (err) {
      throw err;
    }
  }
}

export { CommentRepository };
