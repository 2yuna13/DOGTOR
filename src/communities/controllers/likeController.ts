import { Request, Response } from "express";
import { LikeService } from "../services/likeService";

class LikeController {
  static async addLike(req: Request, res: Response) {
    try {
      const postId = parseInt(req.params.postId, 10);

      await LikeService.addLike(postId);

      return res.status(200).json({ message: "좋아요가 추가되었습니다." });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteLike(req: Request, res: Response) {
    try {
      const postId = parseInt(req.params.postId, 10);

      await LikeService.deleteLike(postId);

      return res.status(200).json({ message: "좋아요가 삭제되었습니다." });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getLikeCount(req: Request, res: Response) {
    try {
      const postId = parseInt(req.params.postId, 10);

      const likeCount = await LikeService.getLikeCount(postId);

      return res.status(200).json({ likeCount });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export { LikeController };
