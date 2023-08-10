import { Request, Response } from "express";
import { PostService } from "../services/postService";
import {
  CreatePostDto,
  UpdatePostDto,
  ReportPostDto,
  Category,
  LikePostDto,
} from "../dtos/postDto";

class PostController {
  static async createPost(req: Request, res: Response) {
    try {
      const userId = req.user as string;
      const { title, body, category } = req.body;

      const createPostDto = new CreatePostDto(
        title,
        body,
        category as Category
      );
      const newPost = await PostService.createPost(createPostDto, userId);

      return res.status(201).json(newPost);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }

  static async getPostsByCategory(req: Request, res: Response) {
    try {
      const userId = (req.user as string) || "";
      const category = req.query.category as Category;
      const currentPage = parseInt(req.query.currentPage as string, 10) || 1;
      const posts = await PostService.getPostsByCategory(
        category,
        currentPage,
        userId
      );
      return res.status(200).json(posts);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }

  static async getPosts(req: Request, res: Response) {
    try {
      const userId = (req.user as string) || "";
      const posts = await PostService.getPosts(userId);
      return res.status(200).json(posts);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }

  static async getPostById(req: Request, res: Response) {
    try {
      const userId = (req.user as string) || "";
      const postId = Number(req.params.postId);
      const post = await PostService.getPostById(postId, userId);
      if (!post) {
        return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
      }
      return res.status(200).json(post);
    } catch (error: any) {
      return res.status(500).json(error.message);
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
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }

  static async deletePost(req: Request, res: Response) {
    try {
      const userId = req.user as string;
      const postId = Number(req.params.postId);

      await PostService.deletePost(postId, userId);

      return res.status(200).json({ message: "게시물 삭제 성공" });
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }

  static async reportPost(req: Request, res: Response) {
    try {
      const userId = req.user as string;
      const { post_id, reason } = req.body;

      const reportPostDto = new ReportPostDto(post_id, reason);
      await PostService.reportPost(reportPostDto, userId);

      return res.status(200).json({ message: "게시물 신고 성공" });
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }

  static async likePost(req: Request, res: Response) {
    try {
      const userId = req.user as string;
      const likePostDto = new LikePostDto(req.body.postId);
      const likeresult = await PostService.likePost(userId, likePostDto);
      res.status(200).json(likeresult);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
}

export { PostController };
