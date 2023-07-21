import { Request, Response } from "express";
import { logger } from "../../utils/winston";
import { ChatService } from "../services/chatService";
import {
  ChatListDto,
  ChatRequestDto,
  ChatSelectDto,
  ChatStatusDto,
} from "../dtos/chatDto";
import { validate } from "class-validator";

class ChatController {
  static async chatRequestController(req: Request, res: Response) {
    try {
      const chatrequestDto = new ChatRequestDto(
        req.body.userEmail,
        req.body.vetEmail,
        req.body.content
      );
      validate(chatrequestDto).then((errors) => {
        if (errors.length > 0) {
          const errorMessages = errors
            .map((error) => Object.values<string>(error.constraints!))
            .join(", ");
          return res
            .status(400)
            .json({ error: `유효성 검사 에러: ${errorMessages}` });
        } else {
          const newRequest = ChatService.addRequest(chatrequestDto);
          logger.info("상담 요청 성공");
          return res.status(201).json(newRequest);
        }
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async chatListController(req: Request, res: Response) {
    try {
      //로그인 토큰으로 유저 파악, 추후 수정 필요
      //const currentEmailId = req.currnetEmailId;
      const chatListDto = new ChatListDto(req.body.email);
      const errors = await validate(chatListDto);
      if (errors.length > 0) {
        const errorMessages = errors
          .map((error) => Object.values<string>(error.constraints!))
          .join(", ");
        return res
          .status(400)
          .json({ error: `유효성 검사 에러: ${errorMessages}` });
      } else {
        const chatList = await ChatService.getChatList(chatListDto);
        logger.info("채팅 목록 조회 성공");
        return res.status(201).json(chatList);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async chatSelectController(req: Request, res: Response) {
    try {
      const chatSelectDto = new ChatSelectDto(req.body.id);
      const errors = await validate(chatSelectDto);
      if (errors.length > 0) {
        const errorMessages = errors
          .map((error) => Object.values<string>(error.constraints!))
          .join(", ");
        return res
          .status(400)
          .json({ error: `유효성 검사 에러: ${errorMessages}` });
      } else {
        const chat = await ChatService.selectChat(chatSelectDto);
        logger.info("채팅 조회 성공");
        return res.status(201).json(chat);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async chatStatusController(req: Request, res: Response) {
    try {
      const chatStatusDto = new ChatStatusDto(req.body.id, req.body.status);
      validate(chatStatusDto).then((errors) => {
        if (errors.length > 0) {
          const errorMessages = errors
            .map((error) => Object.values<string>(error.constraints!))
            .join(", ");
          return res
            .status(400)
            .json({ error: `유효성 검사 에러: ${errorMessages}` });
        } else {
          ChatService.chatStatus(chatStatusDto);
          logger.info("상담 요청 상태 변경 성공");
          return res.status(201).json("상담 요청 상태 변경 성공");
        }
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export { ChatController };
