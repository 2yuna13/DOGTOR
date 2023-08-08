import { LikeRepository } from "../repositories/likeRepository";

class LikeService {
  static async isLiked(postId: number) {
    try {
      return await LikeRepository.isLiked(postId);
    } catch (error) {
      throw error;
    }
  }

  static async addLike(postId: number) {
    try {
      await LikeRepository.addLike(postId);
    } catch (error) {
      throw error;
    }
  }

  static async deleteLike(postId: number) {
    try {
      await LikeRepository.deleteLike(postId);
    } catch (error) {
      throw error;
    }
  }

  static async getLikeCount(postId: number) {
    try {
      return await LikeRepository.getLikeCount(postId);
    } catch (error) {
      throw error;
    }
  }
}

export { LikeService };
