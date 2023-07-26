import { Request, Response } from "express";
import { PostService } from "../services/postService";
import { CreatePostDto, UpdatePostDto } from "../dtos/postDto";

class PostController {
  static async createPost(req: Request, res: Response) {
    try {
      const userId = req.user as string;
      const { title, content } = req.body;

      const createPostDto = new CreatePostDto(title, content);
      const newPost = await PostService.createPost(createPostDto, userId!);

      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ error: "게시물 작성 실패" });
    }
  }

  static async updatePost(req: Request, res: Response) {
    try {
      const userId = req.user as string;
      const postId = Number(req.params.postId);
      const { title, content } = req.body;

      const updatePostDto = new UpdatePostDto(title, content);
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
}

export { PostController };
