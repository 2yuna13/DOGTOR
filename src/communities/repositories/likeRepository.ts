import { PrismaClient, posts } from "@prisma/client";
import { CreateLikeDto } from "../dtos/likeDto";

const prisma = new PrismaClient();

class LikeRepository {
  static async isLiked(postId: number): Promise<boolean> {
    try {
      const likedPost = await prisma.posts.findUnique({
        where: {
          id: postId,
        },
        select: {
          like: true,
        },
      });

      if (!likedPost) {
        throw new Error("게시물이 존재하지 않습니다.");
      }

      return likedPost.like > 0;
    } catch (err) {
      throw err;
    }
  }

  static async addLike(postId: number): Promise<void> {
    try {
      const postToUpdate = await prisma.posts.findUnique({
        where: {
          id: postId,
        },
      });

      if (!postToUpdate) {
        throw new Error("게시물이 존재하지 않습니다.");
      }

      await prisma.posts.update({
        where: {
          id: postId,
        },
        data: {
          like: postToUpdate.like + 1,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  static async deleteLike(postId: number): Promise<void> {
    try {
      const postToUpdate = await prisma.posts.findUnique({
        where: {
          id: postId,
        },
      });

      if (!postToUpdate) {
        throw new Error("게시물이 존재하지 않습니다.");
      }

      if (postToUpdate.like === 0) {
        throw new Error("좋아요 수가 이미 0입니다.");
      }

      await prisma.posts.update({
        where: {
          id: postId,
        },
        data: {
          like: postToUpdate.like - 1,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  static async getLikeCount(postId: number): Promise<number> {
    try {
      const post = await prisma.posts.findUnique({
        where: {
          id: postId,
        },
        select: {
          like: true,
        },
      });

      return post?.like || 0;
    } catch (err) {
      throw err;
    }
  }
}

export { LikeRepository };
