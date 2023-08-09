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
        symptom = "농피증";
        answer =
          "발 또는 몸통, 피부에 농성 산출물 또는 노란 각질이 보인다면 습진, 음식 알레르기, 아토피, 감염성 질환 등의 가능성이 있습니다. 혹은 면역원성 질환, 호르몬 질환이 파악되는 경우도 있기 때문에 조기에 동물병원에 내원하여 점검받길 추천해 드립니다.";
      } else if (response.data.category == "A3") {
        symptom = "태선화,과다색소침착";
        answer =
          "오랫동안 피부 질환을 앓았거나 자극이 지속되어 코끼리 피부처럼 두꺼워지고 갈라지는 것을 의미합니다. 꾸준한 치료가 지속되지 않으면 색상이 점차 짙어지고 상태가 악화할 수 있으니 지속적인 병원 검진을 추천해 드립니다.";
      } else if (response.data.category == "A6") {
        symptom = "결절, 종괴";
        answer =
          "피부에서 작은 돌출된 덩어리로 나타나며 크기, 모양, 색상의 변화를 보일 수 있습니다. 강아지가 핥거나 긁는 행동이 늘어나거나 통증을 보일 경우 주의가 필요합니다. 증상 발견 시 즉시 수의사 상담을 통해 진단받고, 필요한 경우 검사를 통해 원인을 확인한 후 수의사의 지시에 따라 적절한 치료와 관리를 시행해야 합니다.";
      } else {
        symptom = "증상 없음";
        answer =
          "발견된 증상이 없습니다. 다만 정확도를 보장할 수 없으므로 증상이 의심된다면 수의사 상담이나 동물병원에 내원하여 검진받는 것을 추천해 드립니다.";
      }

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
