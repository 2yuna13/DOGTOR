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

  //user_type별, role별, blocked_at별
  static async userListcontroller(req: Request, res: Response) {
    try {
      const userList = await AdminService.getUserList(req.query as any);
      logger.info("유저 목록 조회 성공");
      return res.status(200).json(userList);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}

export { AdminController };
