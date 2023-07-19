import { logger } from "../../utils/winston";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { VetStatusDto } from "../dtos/adminDto";
import { AdminService } from "../services/adminService";

class AdminController {
  static async vetRequestPendingController(req: Request, res: Response) {
    try {
      const vetRequests = await AdminService.getVetRequestsPending();
      console.log(vetRequests);
      res.status(200).send(vetRequests);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async vetRequestAcceptedController(req: Request, res: Response) {
    try {
      const vetRequests = await AdminService.getVetRequestsAccepted();
      res.status(200).send(vetRequests);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async manageVetRequestsController(req: Request, res: Response) {
    try {
      const vetStatusDto = new VetStatusDto(
        req.body.id,
        req.body.user_email,
        req.body.status
      );
      validate(vetStatusDto).then((errors) => {
        if (errors.length > 0) {
          const errorMessages = errors
            .map((error) => Object.values<string>(error.constraints!))
            .join(", ");
          return res
            .status(400)
            .json({ error: `유효성 검사 에러: ${errorMessages}` });
        } else {
          const vetStatus = AdminService.manageVetRequests(vetStatusDto);
          logger.info("수의사 신청 정보 변경 성공");
          return res.status(201).json("수의사 신청 정보 변경 성공");
        }
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export { AdminController };
