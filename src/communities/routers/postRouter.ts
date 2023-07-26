import { Request, Response } from "express";
import { CreatePostDto, UpdatePostDto } from "../dtos/postDto";
import { PostService } from "../services/postService";

class PostController {
  static async createPost(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { title, body } = req.body;

      const createPostDto = new CreatePostDto(title, body);
      const newPost = await PostService.createPost(createPostDto, userId);

      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ error: "게시물 작성 실패" });
    }
  }

  static async updatePost(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
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
      const userId = req.user?.id;
      const postId = Number(req.params.postId);

      await PostService.deletePost(postId, userId);

      return res.status(200).json({ message: "게시물 삭제 성공" });
    } catch (error) {
      return res.status(500).json({ error: "게시물 삭제 실패" });
    }
  }
}

export { PostController };
