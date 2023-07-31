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

  static async reportPost(reportPostDto: ReportPostDto, userId: string) {
    try {
      const { post_id, reason } = reportPostDto;
      const existingPost = await PostRepository.getPostById(post_id);

      if (!existingPost) {
        throw new Error("게시물이 존재하지 않습니다.");
      }

      if (existingPost.author_email !== userId) {
        throw new Error("자신의 게시물을 신고할 수 없습니다.");
      }

      const { report, report_posts } = await PostRepository.reportPost(
        reportPostDto,
        userId
      );

      return { report, report_posts };
    } catch (error) {
      throw error;
    }
  }
}

export { PostService };
