import { Request, Response } from "express";
import { logger } from "../../utils/winston";
import axios from "axios";
import fs from "fs";

class DiseaseController {
  static async diseaseCheckController(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "사진 미첨부" });
      }
      const image = fs.readFileSync(req.file.path);
      const response = await axios.post(
        "http://127.0.0.1:5223/uploader",
        image,
        {
          headers: {
            "Content-Type": req.file.mimetype, // 파일의 Content-Type 설정
          },
        }
      );
      res.status(201).json(response.data);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export { DiseaseController };
