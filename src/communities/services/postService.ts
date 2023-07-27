import { CreatePostDto, UpdatePostDto } from "../dtos/postDto";
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
    userId: string
  ) {
    try {
      return await PostRepository.updatePost(
        postId,
        postDto.title,
        postDto.body
      );
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(postId: number, userId: string) {
    try {
      await PostRepository.deletePost(postId);
    } catch (error) {
      throw error;
    }
  }

  static async getPostById(postId: number) {
    try {
      return await PostRepository.getPostById(postId);
    } catch (error) {
      throw error;
    }
  }

  static async getPosts() {
    try {
      return await PostRepository.getPosts();
    } catch (error) {
      throw error;
    }
  }
}

export { PostService };
