import { logger } from "../../utils/winston";
import { Request, Response } from "express";
import { AdminService } from "../services/adminService";

class AdminController {
  static async vetRequestListsController(req: Request, res: Response) {
    try {
      const vetLists = await AdminService.getVetRequestLists(req.query as any);
      logger.info("수의사 신청 목록 조회 성공");
      return res.status(200).json(vetLists);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async manageVetRequestsController(req: Request, res: Response) {
    try {
      await AdminService.manageVetRequests(req.body);
      logger.info("수의사 신청 정보 변경 성공");
      return res.status(201).json("수의사 신청 정보 변경 성공");
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  //user role별, blocked_at별, deleted_at별
  static async userListcontroller(req: Request, res: Response) {
    try {
      const rowPerPage: number = 10;
      const currentPage = parseInt(req.query.currentPage as string) || 1;
      const totalUsersCnt = await AdminService.getTotalUsersCnt(
        req.query as any
      );
      let startIndex: number = (currentPage - 1) * rowPerPage;
      if (startIndex < 0) {
        startIndex = 0;
      }
      const userList = await AdminService.getUserList(
        req.query as any,
        startIndex,
        rowPerPage
      );
      logger.info("유저 목록 조회 성공");
      return res.status(200).json({
        totalUsersCnt,
        currentPage,
        totalPages: Math.ceil(totalUsersCnt / rowPerPage),
        data: userList,
      });
    } catch (error: any) {
      logger.error("유저 목록 조회 실패");
      res.status(500).json(error.message);
    }
  }

  static async manageUserController(req: Request, res: Response) {
    try {
      await AdminService.manageUsers(req.body);
      logger.info("유저 상태 변경 성공");
      return res.status(201).json("유저 상태가 변경되었습니다.");
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  static async postListcontroller(req: Request, res: Response) {
    try {
      const rowPerPage: number = 10;
      const currentPage = parseInt(req.query.currentPage as string) || 1;
      const { reportedPostList, totalPostsCnt } =
        await AdminService.getPostList(
          req.query as any,
          currentPage,
          rowPerPage
        );

      logger.info("게시글 신고 목록 조회 성공");
      return res.status(200).json({
        currentPage,
        totalPages: Math.ceil(totalPostsCnt / rowPerPage),
        data: reportedPostList,
      });
    } catch (error: any) {
      logger.error("게시글 신고 목록 조회 실패");
      res.status(500).json(error.message);
    }
  }

  static async commentListcontroller(req: Request, res: Response) {
    try {
      const rowPerPage: number = 10;
      const currentPage = parseInt(req.query.currentPage as string) || 1;
      const { reportedCommentList, totalCommentsCnt } =
        await AdminService.getCommentList(
          req.query as any,
          currentPage,
          rowPerPage
        );

      logger.info("댓글 신고 목록 조회 성공");
      return res.status(200).json({
        currentPage,
        totalPages: Math.ceil(totalCommentsCnt / rowPerPage),
        data: reportedCommentList,
      });
    } catch (error: any) {
      logger.error("댓글 신고 목록 조회 실패");
      res.status(500).json(error.message);
    }
  }
}

export { AdminController };
