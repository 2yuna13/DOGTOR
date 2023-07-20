import { logger } from "../../utils/winston";
import { PrismaClient } from "@prisma/client";
import {
  ChatListDto,
  ChatRequestDto,
  ChatSelectDto,
  ChatStatusDto,
} from "../dtos/chatDto";

const prisma = new PrismaClient();

class ChatService {
  static async addRequest(chatRequestDto: ChatRequestDto) {
    try {
      const createRequest = await prisma.chat_rooms.create({
        data: {
          user_email: chatRequestDto.userEmail,
          user_vet_email: chatRequestDto.vetEmail,
        },
      });
      await prisma.chat_contents.create({
        data: {
          chat_room_id: createRequest.id,
          is_from_user: true,
          from_id: createRequest.user_email,
          content: chatRequestDto.content,
        },
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  static async getChatList(chatListDto: ChatListDto) {
    try {
      const getChatList = await prisma.chat_rooms.findMany({
        where: {
          OR: [
            { user_email: chatListDto.email },
            { user_vet_email: chatListDto.email },
          ],
        },
        orderBy: {
          updated_at: "desc",
        },
      });
      return getChatList;
    } catch (error) {
      throw error;
    }
  }

  static async selectChat(chatSelectDto: ChatSelectDto) {
    try {
      const selectChat = await prisma.chat_contents.findMany({
        where: { chat_room_id: chatSelectDto.id },
        orderBy: { created_at: "desc" },
      });
      return selectChat;
    } catch (error) {
      throw error;
    }
  }

  static async chatStatus(chatStatusDto: ChatStatusDto) {
    try {
      const chatStatus = await prisma.chat_rooms.update({
        where: { id: chatStatusDto.id },
        data: { status: chatStatusDto.status },
      });
      return;
    } catch (error) {
      throw error;
    }
  }
}

export { ChatService };
