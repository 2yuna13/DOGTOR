import { Request, Response } from "express";
import { logger } from "../../utils/winston";
import { DiseaseService } from "../services/diseaseService";

class DiseaseController {
  static async diseaseCheckController(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "사진 미첨부" });
      }
      const analysisResult = await DiseaseService.DiseaseAnalysis(
        req.file.path,
        req.file.mimetype
      );
      res.status(201).json(analysisResult);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async getVetsController(req: Request, res: Response) {
    try {
      const vets = await DiseaseService.getVets();

      res.status(200).json(vets);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export { DiseaseController };
