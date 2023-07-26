import { logger } from "../../utils/winston";
import { PrismaClient } from "@prisma/client";
import {
  ChatListDto,
  ChatRequestDto,
  ChatSelectDto,
  ChatStatusDto,
  VetRegionDto,
} from "../dtos/chatDto";

const prisma = new PrismaClient();

class ChatService {
  static async addRequest(chatRequestDto: ChatRequestDto, userEmail: string) {
    try {
      const createRequest = await prisma.chat_rooms.create({
        data: {
          user_email: userEmail,
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
    } catch (Error) {
      throw Error;
    }
  }

  static async getChatList(email: string) {
    try {
      const getChatList = await prisma.chat_rooms.findMany({
        where: {
          OR: [{ user_email: email }, { user_vet_email: email }],
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

  static async selectChat(id: number, email: string) {
    try {
      const selectChat = await prisma.chat_contents.findMany({
        where: {
          chat_room_id: id,
          chat_rooms: {
            OR: [{ user_email: email }, { user_vet_email: email }],
          },
        },
        orderBy: { created_at: "asc" },
      });
      return selectChat;
    } catch (error) {
      throw error;
    }
  }

  static async chatStatus(chatStatusDto: ChatStatusDto, vetEmail: string) {
    try {
      await prisma.chat_rooms.updateMany({
        where: { id: chatStatusDto.id, user_vet_email: vetEmail },
        data: { status: chatStatusDto.status },
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  static async addChat(email: string, chatId: number, content: string) {
    try {
      const checkUser = await prisma.chat_rooms.findFirst({
        where: { id: chatId },
      });
      if (checkUser?.user_email == email) {
        await prisma.chat_contents.create({
          data: {
            chat_room_id: chatId,
            is_from_user: true,
            from_id: email,
            content: content,
          },
        });
      } else {
        await prisma.chat_contents.create({
          data: {
            chat_room_id: chatId,
            is_from_user: false,
            from_id: email,
            content: content,
          },
        });
      }
      await prisma.chat_rooms.update({
        where: { id: chatId },
        data: {
          updated_at: new Date(),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getTotalVetCnt(vetRegionDto: VetRegionDto) {
    try {
      return await prisma.vets.count({
        where: { region: vetRegionDto.region },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getVetList(
    vetRegionDto: VetRegionDto,
    startIndex: number,
    rowPerPage: number
  ) {
    try {
      const vetList = await prisma.vets.findMany({
        where: { region: vetRegionDto.region },
        skip: startIndex,
        take: rowPerPage,
      });
      return vetList;
    } catch (error) {
      throw error;
    }
  }
}

export { ChatService };
