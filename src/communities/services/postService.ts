import { posts_category } from "@prisma/client";
import { CreatePostDto, UpdatePostDto, ReportPostDto } from "../dtos/postDto";
import { PostRepository } from "../repositories/postRepository";

class PostService {
  static async createPost(postDto: CreatePostDto, userId: string) {
    try {
      return await PostRepository.createPost(postDto, userId);
    } catch (error) {
      throw error;
    }
  }

  static async updatePost(
    postDto: UpdatePostDto,
    postId: number,
    author_email: string
  ) {
    try {
      return await PostRepository.updatePost(
        postId,
        postDto.title,
        postDto.body,
        author_email
      );
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(postId: number, author_email: string) {
    try {
      await PostRepository.deletePost(postId, author_email);
    } catch (error) {
      throw error;
    }
  }

  static async getPostsByCategory(
    category: posts_category,
    currentPage: number,
    userId: string
  ) {
    try {
      const pageSize: number = 10;
      const skip = (currentPage - 1) * pageSize;

      if (!category) {
        const totalPosts = await PostRepository.getPosts(userId);
        const paginatedPosts = totalPosts.slice(skip, skip + pageSize);

        return {
          total: totalPosts.length,
          currentPage,
          pageSize,
          posts: paginatedPosts,
        };
      }

      const postsByCategory = await PostRepository.getPostsByCategory(
        category,
        userId
      );
      const paginatedPosts = postsByCategory.slice(skip, skip + pageSize);

      return {
        total: postsByCategory.length,
        currentPage,
        pageSize,
        posts: paginatedPosts,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getPostById(postId: number, userId: string) {
    try {
      return await PostRepository.getPostById(postId, userId);
    } catch (error) {
      throw error;
    }
  }

  static async getPosts(userId: string) {
    try {
      return await PostRepository.getPosts(userId);
    } catch (error) {
      throw error;
    }
  }

  static async reportPost(reportPostDto: ReportPostDto, userId: string) {
    try {
      const { report, report_posts } = await PostRepository.reportPost(
        reportPostDto,
        userId
      );

      return { report, report_posts };
    } catch (error) {
      throw error;
    }
  }

  static async likePost(userId: string, postId: number) {
    try {
      const checkExist = await PostRepository.findLike(userId, postId);
      if (checkExist?.is_like == true) {
        await PostRepository.changeLike(checkExist?.id, false);
      } else if (checkExist?.is_like == false) {
        await PostRepository.changeLike(checkExist?.id, true);
      } else {
        await PostRepository.likePost(userId, postId);
      }
      return await PostRepository.updateLike(userId, postId);
    } catch (error) {
      throw error;
    }
  }
}

export { PostService };
