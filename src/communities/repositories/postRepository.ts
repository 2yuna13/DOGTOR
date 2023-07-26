import { PrismaClient, posts } from "@prisma/client";

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

  static async createPost(title: string, body: string): Promise<posts> {
    try {
      const post = await prisma.posts.create({
        data: {
          author_email,
          title,
          body,
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
    body: string
  ): Promise<posts> {
    try {
      const updatedPost = await prisma.posts.update({
        where: { id: postId },
        data: {
          title,
          body,
        },
      });
      return updatedPost;
    } catch (err) {
      throw err;
    }
  }

  static async deletePost(postId: number): Promise<posts> {
    try {
      const deletedPost = await prisma.posts.delete({
        where: { id: postId },
      });
      return deletedPost;
    } catch (err) {
      throw err;
    }
  }
}

export { PostRepository };
