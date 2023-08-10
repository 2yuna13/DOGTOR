import { PrismaClient, posts, reports, report_posts } from "@prisma/client";
import { CreatePostDto, ReportPostDto } from "../dtos/postDto";
import { posts_category } from "@prisma/client";
import { KORDATE } from "../../utils/constant";

const prisma = new PrismaClient();

class PostRepository {
  static async getPostById(
    postId: number,
    userId: string
  ): Promise<posts | null> {
    try {
      const post = await prisma.posts.findUnique({
        where: { id: postId },
        include: {
          users: true,
          likes: {
            where: { author_email: userId },
            select: {
              is_like: true,
            },
          },
        },
      });
      return post;
    } catch (err) {
      throw err;
    }
  }

  static async getPosts(userId: string): Promise<posts[]> {
    try {
      const posts = await prisma.posts.findMany({
        where: {
          deleted_at: null,
        },
        include: {
          users: true,
          likes: {
            where: { author_email: userId },
            select: {
              is_like: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return posts;
    } catch (err) {
      throw err;
    }
  }

  static async getPostsByCategory(
    category: posts_category,
    userId: string
  ): Promise<posts[]> {
    try {
      const posts = await prisma.posts.findMany({
        where: {
          category: category,
          deleted_at: null,
        },
        include: {
          users: true,
          likes: {
            where: { author_email: userId },
            select: {
              is_like: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });
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
          created_at: new Date(Date.now() + KORDATE),
          updated_at: new Date(Date.now() + KORDATE),
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

      const deletedPost = await prisma.posts.update({
        where: { id: postId },
        data: {
          deleted_at: new Date(),
        },
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

      if (existingPost.author_email === author_email) {
        throw new Error("자신의 게시물을 신고할 수 없습니다.");
      }

      const existingReport = await prisma.report_posts.findFirst({
        where: {
          post_id,
        },
      });

      if (existingReport) {
        throw new Error("이미 해당 게시물을 신고하셨습니다.");
      }

      const report = await prisma.reports.create({
        data: {
          author_email,
          content: reason,
          status: "pending",
          created_at: new Date(Date.now() + KORDATE),
          updated_at: new Date(Date.now() + KORDATE),
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

  static async likePost(userId: string, postId: number) {
    try {
      return await prisma.likes.create({
        data: { post_id: postId, author_email: userId },
      });
    } catch (error) {
      throw error;
    }
  }

  static async findLike(userId: string, postId: number) {
    try {
      return await prisma.likes.findFirst({
        where: { post_id: postId, author_email: userId },
      });
    } catch (error) {
      throw error;
    }
  }

  static async changeLike(id: number, like: boolean) {
    try {
      return await prisma.likes.update({
        where: { id },
        data: { is_like: like },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateLike(userId: string, postId: number) {
    try {
      const likes = await prisma.likes.count({
        where: { post_id: postId, is_like: true },
      });
      await prisma.posts.update({
        where: { id: postId },
        data: { like: likes },
      });
      return await prisma.posts.findUnique({
        where: { id: postId },
        select: {
          like: true,
          likes: {
            where: { author_email: userId },
            select: {
              is_like: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export { PostRepository };
