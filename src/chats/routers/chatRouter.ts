import { Router } from "express";
import { ChatController } from "../controllers/chatController";
import {
  ChatListDto,
  ChatRequestDto,
  ChatSelectDto,
  ChatStatusDto,
  VetRegionDto,
} from "../dtos/chatDto";
import validationMiddleware from "../../middlewares/validateDto";
import passport from "passport";
import PermissionValidation from "../../middlewares/permission";

const ChatRouter = Router();

//수의사 목록 조회
ChatRouter.get(
  "/chats/vet-lists",
  //validationMiddleware(VetRegionDto),
  ChatController.vetListController
);

//login required, 상담 신청
ChatRouter.post(
  "/chats/request",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware(ChatRequestDto),
  ChatController.chatRequestController
);

//login required, 내 채팅 목록 조회, status가 pending인건 따로
ChatRouter.get(
  "/chats",
  passport.authenticate("jwt", { session: false }),
  ChatController.chatListController
);

//login required, 특정 채팅방 조회
ChatRouter.get(
  "/chats/:id",
  passport.authenticate("jwt", { session: false }),
  //validationMiddleware(ChatSelectDto),
  ChatController.chatSelectController
);

//수의사 전용, 채팅 상담 상태 변경
ChatRouter.patch(
  "/chats/status",
  passport.authenticate("jwt", { session: false }),
  PermissionValidation("vet"),
  validationMiddleware(ChatStatusDto),
  ChatController.chatStatusController
);
export { ChatRouter };
