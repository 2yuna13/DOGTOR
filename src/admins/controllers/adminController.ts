import { logger } from "../../utils/winston";
import { Request, Response } from "express";
import { AdminService } from "../services/adminService";

class AdminController {
  static async vetRequestListsController(req: Request, res: Response) {
    try {
      const vetLists = await AdminService.getVetRequestLists(req.body.status);
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
}

export { AdminController };
