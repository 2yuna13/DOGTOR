import {
  PrismaClient,
  comments,
  reports,
  report_comments,
} from "@prisma/client";
import { CreateCommentDto, ReportCommentDto } from "../dtos/commentDto";

const prisma = new PrismaClient();

class CommentRepository {
  static async getComments(postId: number): Promise<comments[] | null> {
    try {
      return await prisma.comments.findMany({
        where: { post_id: postId, deleted_at: null },
        include: {
          users: true,
          report_comments: {
            include: {
              reports: true,
            },
          },
        },
      });
    } catch (err) {
      throw err;
    }
  }

  static async getCommentById(commentId: number): Promise<comments | null> {
    try {
      return await prisma.comments.findUnique({
        where: { id: commentId },
        include: {
          users: true,
          report_comments: {
            include: {
              reports: true,
            },
          },
        },
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
      const existingComment = await prisma.comments.findUnique({
        where: { id: commentId },
        select: { author_email: true },
      });

      if (!existingComment) {
        throw new Error("댓글이 존재하지 않습니다.");
      }

      const deletedComment = await prisma.comments.update({
        where: { id: commentId },
        data: {
          deleted_at: new Date(),
        },
      });

      return deletedComment;
    } catch (err) {
      throw err;
    }
  }

  static async reportComment(
    commentDto: ReportCommentDto,
    author_email: string
  ): Promise<{ report: reports; report_comments: report_comments }> {
    try {
      const { comment_id, reason } = commentDto;

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

      const existingReport = await prisma.report_comments.findFirst({
        where: {
          comment_id,
        },
      });

      if (existingReport) {
        throw new Error("이미 해당 댓글을 신고하셨습니다.");
      }

      const report = await prisma.reports.create({
        data: {
          author_email,
          content: reason,
          status: "pending",
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
