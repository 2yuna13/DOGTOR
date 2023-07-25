import { Request, Response } from "express";
import { logger } from "../../utils/winston";
import { ChatService } from "../services/chatService";

class ChatController {
  static async chatRequestController(req: Request, res: Response) {
    try {
      const newRequest = ChatService.addRequest(req.body, req.user as string);
      logger.info("상담 요청 성공");
      return res.status(201).json(newRequest);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async chatListController(req: Request, res: Response) {
    try {
      const chatList = await ChatService.getChatList(req.user as string);
      logger.info("채팅 목록 조회 성공");
      return res.status(201).json(chatList);
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
      return res.status(201).json(chat);
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
}

export { ChatController };
