import { Request, Response } from "express";
import { PostService } from "../services/postService";
import { CreatePostDto, UpdatePostDto } from "../dtos/postDto";

class PostController {
  static async createPost(req: Request, res: Response) {
    try {
      const userId = req.user as string;
      const { title, body, category } = req.body;

      const createPostDto = new CreatePostDto(title, body, category);
      const newPost = await PostService.createPost(createPostDto, userId);

      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ error: "게시물 작성 실패" });
    }
  }

  static async getPosts(req: Request, res: Response) {
    try {
      const posts = await PostService.getPosts();
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ error: "게시물 조회 실패" });
    }
  }

  static async getPostById(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const post = await PostService.getPostById(postId);
      if (!post) {
        return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
      }
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: "게시물 상세 조회 실패" });
    }
  }

  static async updatePost(req: Request, res: Response) {
    try {
      const userId = req.user as string;
      const postId = Number(req.params.postId);
      const { title, body } = req.body;

      const updatePostDto = new UpdatePostDto(title, body);
      const updatedPost = await PostService.updatePost(
        updatePostDto,
        postId,
        userId
      );

      return res.status(200).json(updatedPost);
    } catch (error) {
      return res.status(500).json({ error: "게시물 수정 실패" });
    }
  }

  static async deletePost(req: Request, res: Response) {
    try {
      const userId = req.user as string;
      const postId = Number(req.params.postId);

      await PostService.deletePost(postId, userId);

      return res.status(200).json({ message: "게시물 삭제 성공" });
    } catch (error) {
      return res.status(500).json({ error: "게시물 삭제 실패" });
    }
  }

  static async reportPost(req: Request, res: Response) {
    try {
      const userId = req.user as string;
      const { postId, 신고내용 } = req.body;

      return res.status(200).json({ message: "게시물 신고 성공" });
    } catch (error) {
      return res.status(500).json({ error: "게시물 신고 실패" });
    }
  }
}

export { PostController };
