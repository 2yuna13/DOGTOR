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
      const formData = new FormData();
      const fileContent = fs.readFileSync(req.file.path);
      const fileBlob = new Blob([fileContent], { type: req.file.mimetype });
      formData.append("photo", fileBlob, req.file.originalname);
      const response = await axios.post(
        "http://127.0.0.1:5223/uploader",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
