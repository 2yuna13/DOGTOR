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
          message: chatRequestDto.message,
        },
      });
      return;
    } catch (Error) {
      throw Error;
    }
  }

  static async getChatList(email: string, chatListDto: ChatListDto) {
    try {
      const getChatList = await prisma.chat_rooms.findMany({
        where: {
          AND: [
            { OR: [{ user_email: email }, { user_vet_email: email }] },
            { status: chatListDto.status },
          ],
        },
        orderBy: {
          updated_at: "desc",
        },
        include: {
          chat_contents: {
            select: {
              message: true,
            },
            orderBy: {
              created_at: "desc",
            },
            take: 1, // 최근 생성된 chat_contents 하나만 가져오도록 설정
          },
          users_chat_rooms_user_emailTousers: {
            select: {
              email: true,
              nickname: true,
              img_path: true,
            },
          },
          users_chat_rooms_user_vet_emailTousers: {
            select: {
              email: true,
              nickname: true,
              img_path: true,
              vets: {
                select: {
                  name: true,
                  hospital_name: true,
                },
              },
            },
          },
        },
      });
      return getChatList;
    } catch (error) {
      throw error;
    }
  }

  static async selectChat(id: number, email: string) {
    try {
      let opponent,
        nickname,
        img_path,
        writable: boolean = false,
        editable: boolean = false;
      const ChatContents = await prisma.chat_contents.findMany({
        where: {
          chat_room_id: id,
          chat_rooms: {
            OR: [{ user_email: email }, { user_vet_email: email }],
          },
        },
        orderBy: { created_at: "asc" },
      });
      const checkStatus = await prisma.chat_rooms.findUnique({
        where: {
          id: id,
        },
      });
      if (email == checkStatus?.user_vet_email) {
        opponent = checkStatus.user_email;
      } else {
        opponent = checkStatus?.user_vet_email;
      }
      await prisma.users
        .findUnique({ where: { email: opponent } })
        .then((response) => {
          nickname = response?.nickname;
          img_path = response?.img_path;
        });
      if (checkStatus?.status == "accepted") {
        writable = true;
      } else {
        if (email == checkStatus?.user_vet_email) {
          editable = true;
        }
      }

      return { ChatContents, writable, editable, email, nickname, img_path };
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

  static async addChat(email: string, chatId: number, message: string) {
    try {
      const checkUser = await prisma.chat_rooms.findFirst({
        where: {
          AND: [{ id: chatId }, { status: "accepted" }],
        },
      });
      if (checkUser?.user_email == email) {
        await prisma.chat_contents.create({
          data: {
            chat_room_id: chatId,
            is_from_user: true,
            from_id: email,
            message: message,
          },
        });
      } else {
        await prisma.chat_contents.create({
          data: {
            chat_room_id: chatId,
            is_from_user: false,
            from_id: email,
            message: message,
          },
        });
      }
      await prisma.chat_rooms.update({
        where: { id: chatId },
        data: {
          updated_at: new Date(),
        },
      });
      return await prisma.users.findUnique({
        where: { email: email },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getTotalVetCnt(vetRegionDto: VetRegionDto) {
    try {
      if (!vetRegionDto.region && !vetRegionDto.search) {
        return await prisma.vets.count();
      } else if (vetRegionDto.region && !vetRegionDto.search) {
        return await prisma.vets.count({
          where: { region: vetRegionDto.region },
        });
      } else if (vetRegionDto.search && !vetRegionDto.region) {
        return await prisma.vets.count({
          where: {
            OR: [
              { name: { contains: vetRegionDto.search } },
              { hospital_name: { contains: vetRegionDto.search } },
            ],
          },
        });
      } else {
        return await prisma.vets.count({
          where: {
            AND: [
              {
                OR: [
                  { name: { contains: vetRegionDto.search } },
                  { hospital_name: { contains: vetRegionDto.search } },
                ],
              },
              { region: vetRegionDto.region },
            ],
          },
        });
      }
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
      if (!vetRegionDto.region && !vetRegionDto.search) {
        return await prisma.vets.findMany({
          skip: startIndex,
          take: rowPerPage,
        });
      } else if (vetRegionDto.region && !vetRegionDto.search) {
        return await prisma.vets.findMany({
          where: { region: vetRegionDto.region },
          skip: startIndex,
          take: rowPerPage,
        });
      } else if (vetRegionDto.search && !vetRegionDto.region) {
        return await prisma.vets.findMany({
          where: {
            OR: [
              { name: { contains: vetRegionDto.search } },
              { hospital_name: { contains: vetRegionDto.search } },
            ],
          },
          skip: startIndex,
          take: rowPerPage,
        });
      } else {
        return await prisma.vets.findMany({
          where: {
            AND: [
              {
                OR: [
                  { name: { contains: vetRegionDto.search } },
                  { hospital_name: { contains: vetRegionDto.search } },
                ],
              },
              { region: vetRegionDto.region },
            ],
          },
          skip: startIndex,
          take: rowPerPage,
        });
      }
    } catch (error) {
      throw error;
    }
  }
}

export { ChatService };
