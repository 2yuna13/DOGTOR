import { DiseaseRepository } from "../repositories/diseaseRepository";
import axios from "axios";
import fs from "fs";

class DiseaseService {
  static async DiseaseAnalysis(path: string, mimetype: string) {
    try {
      let symptom: string, answer: string;
      const image = fs.readFileSync(path);
      const response = await axios.post(
        "http://127.0.0.1:5223/uploader",
        image,
        {
          headers: {
            "Content-Type": mimetype, // 파일의 Content-Type 설정
          },
        }
      );
      if (response.data.category == "A1") {
        symptom = "구진,플라크";
        answer = "구진,플라크 입니다. 해결방법은 없습니다.";
      } else if (response.data.category == "A3") {
        symptom = "태선화,과다색소침착";
        answer = "태선화,과다색소침착 입니다. 해결방법은 없습니다.";
      } else if (response.data.category == "A6") {
        symptom = "결절, 종괴";
        answer = "결절,종괴 입니다. 해결방법은 찾는중입니다.";
      } else {
        symptom = "증상 없음";
        answer = "발견된 증상이 없습니다.";
      }
      console.log(response.data.val_A2);

      return { symptom, answer };
    } catch (error) {
      throw error;
    }
  }

  static async getVets() {
    try {
      return await DiseaseRepository.findTopVets();
    } catch (error) {
      throw error;
    }
  }
}

export { DiseaseService };
