import { Router } from "express";
import { ChatController } from "../controllers/chatController";

const ChatRouter = Router();

//login required, 상담 신청
ChatRouter.post("/chat/request", ChatController.chatRequestController);

//login required, 내 채팅 목록 조회
ChatRouter.get("/chat/lists", ChatController.chatListController);

//login required, 특정 채팅방 조회
ChatRouter.get("/chat/:id", ChatController.chatSelectController);

//수의사 전용, 채팅 상담 상태 변경
ChatRouter.put("/chat/status", ChatController.chatStatusController);
export { ChatRouter };
