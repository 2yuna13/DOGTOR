import { PrismaClient, posts, reports, report_posts } from "@prisma/client";
import { CreatePostDto, ReportPostDto } from "../dtos/postDto";

const prisma = new PrismaClient();

class PostRepository {
  static async getPostById(postId: number): Promise<posts | null> {
    try {
      const post = await prisma.posts.findUnique({
        where: { id: postId },
      });
      return post;
    } catch (err) {
      throw err;
    }
  }

  static async getPosts(): Promise<posts[]> {
    try {
      const posts = await prisma.posts.findMany();
      return posts;
    } catch (err) {
      throw err;
    }
  }

  static async createPost(
    postDto: CreatePostDto,
    userId: string
  ): Promise<posts> {
    try {
      const post = await prisma.posts.create({
        data: {
          author_email: userId,
          title: postDto.title,
          body: postDto.body,
          category: postDto.category,
          like: 0,
        },
      });
      return post;
    } catch (err) {
      throw err;
    }
  }

  static async updatePost(
    postId: number,
    title: string,
    body: string,
    author_email: string
  ): Promise<posts> {
    try {
      const existingPost = await prisma.posts.findUnique({
        where: { id: postId },
        select: { author_email: true },
      });

      if (!existingPost) {
        throw new Error("게시물이 존재하지 않습니다.");
      }

      if (existingPost.author_email !== author_email) {
        throw new Error("게시물 수정 권한이 없습니다.");
      }

      const updatedPost = await prisma.posts.update({
        where: { id: postId },
        data: {
          title,
          body,
          updated_at: new Date(),
        },
      });

      return updatedPost;
    } catch (err) {
      throw err;
    }
  }

  static async deletePost(
    postId: number,
    author_email: string
  ): Promise<posts> {
    try {
      const existingPost = await prisma.posts.findUnique({
        where: { id: postId },
        select: { author_email: true },
      });

      if (!existingPost) {
        throw new Error("게시물이 존재하지 않습니다.");
      }

      if (existingPost.author_email !== author_email) {
        throw new Error("게시물 삭제 권한이 없습니다.");
      }

      const deletedPost = await prisma.posts.delete({
        where: { id: postId },
      });

      return deletedPost;
    } catch (err) {
      throw err;
    }
  }

  static async reportPost(
    postDto: ReportPostDto,
    author_email: string
  ): Promise<{ report: reports; report_posts: report_posts }> {
    try {
      const { post_id, reason } = postDto;

      const existingPost = await prisma.posts.findUnique({
        where: { id: post_id },
        select: { author_email: true },
      });

      if (!existingPost) {
        throw new Error("게시물이 존재하지 않습니다.");
      }

      if (existingPost.author_email !== author_email) {
        throw new Error("자신의 게시물을 신고할 수 없습니다.");
      }

      const report = await prisma.reports.create({
        data: {
          author_email,
          content: reason,
          status: "pending",
        },
      });

      const reportPost = await prisma.report_posts.create({
        data: {
          post_id,
          report_id: report.id,
        },
      });

      return { report, report_posts: reportPost };
    } catch (err) {
      throw err;
    }
  }
}

export { PostRepository };
