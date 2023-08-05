import { Request, Response } from "express";
import { logger } from "../../utils/winston";
import { ChatService } from "../services/chatService";
import { VetRegionDto } from "../dtos/chatDto";

class ChatController {
  static async vetListController(req: Request, res: Response) {
    try {
      const rowPerPage: number = 10;
      const currentPage = parseInt(req.query.currentPage as string);
      const totalVetsCnt = await ChatService.getTotalVetCnt(req.query as any);
      let startIndex: number = (currentPage - 1) * rowPerPage;
      if (startIndex < 0) {
        startIndex = 0;
      }
      const vetList = await ChatService.getVetList(
        req.query as any,
        startIndex,
        rowPerPage
      );
      logger.info("수의사 목록 조회 성공");
      return res.status(200).json({
        totalVetsCnt,
        currentPage,
        totalPages: Math.ceil(totalVetsCnt / rowPerPage),
        data: vetList,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async chatRequestController(req: Request, res: Response) {
    try {
      const newRequest = await ChatService.addRequest(
        req.body,
        req.user as string
      );
      if (newRequest) {
        logger.info("상담 요청 실패(중복요청)");
        return res.status(400).json(newRequest);
      } else {
        logger.info("상담 요청 성공");
        return res.status(201).json("상담 요청 성공");
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async chatListController(req: Request, res: Response) {
    try {
      const chatList = await ChatService.getChatList(
        req.user as string,
        req.query as any
      );
      logger.info("채팅 목록 조회 성공");
      return res.status(200).json(chatList);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async chatSelectController(req: Request, res: Response) {
    try {
      const chat = await ChatService.selectChat(
        parseInt(req.params.id) as number,
        req.user as string
      );
      logger.info("채팅 조회 성공");
      return res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async chatStatusController(req: Request, res: Response) {
    try {
      await ChatService.chatStatus(req.body, req.user as string);
      logger.info("상담 요청 상태 변경 성공");
      return res.status(201).json("상담 요청 상태 변경 성공");
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async chatRatingController(req: Request, res: Response) {
    try {
      await ChatService.rateChat(req.body);
      logger.info("채팅 평가 성공");
      return res.status(201).json("채팅 평가가 완료되었습니다.");
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async chatExitController(req: Request, res: Response) {
    try {
      await ChatService.exitChat(
        parseInt(req.query.id as string),
        req.user as string
      );
      logger.info("채팅방 나가기 성공");
      return res.status(200).json("채팅 나가기 성공");
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export { ChatController };
