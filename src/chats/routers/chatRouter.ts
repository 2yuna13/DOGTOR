import { Router } from "express";
import { ChatController } from "../controllers/chatController";
import {
  ChatListDto,
  ChatRequestDto,
  ChatSelectDto,
  ChatStatusDto,
} from "../dtos/chatDto";
import validationMiddleware from "../../middlewares/validateDto";

const ChatRouter = Router();

//login required, 상담 신청
ChatRouter.post(
  "/chats/request",
  validationMiddleware(ChatRequestDto),
  ChatController.chatRequestController
);

//login required, 내 채팅 목록 조회
ChatRouter.get(
  "/chats",
  validationMiddleware(ChatListDto),
  ChatController.chatListController
);

//login required, 특정 채팅방 조회
ChatRouter.get("/chats/:id", ChatController.chatSelectController);

//수의사 전용, 채팅 상담 상태 변경
ChatRouter.put(
  "/chats/status",
  validationMiddleware(ChatStatusDto),
  ChatController.chatStatusController
);
export { ChatRouter };
