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
    postId: string,
    userId: string
  ) {
    try {
      return await PostRepository.updatePost(postDto, postId, userId);
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(postId: string, userId: string) {
    try {
      await PostRepository.deletePost(postId, userId);
    } catch (error) {
      throw error;
    }
  }
}

export { PostService };
