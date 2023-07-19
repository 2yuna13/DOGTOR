import { logger } from "../../utils/winston";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { AdminService } from "../services/adminService";

class AdminController {
  static async vetRequestPendingController(req: Request, res: Response) {
    try {
      /*         const vets = await AdminService.getVetRequestsPending;
        res.status(200).send(vetRequests); */
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export { AdminController };
