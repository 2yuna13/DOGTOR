import { logger } from "../../utils/winston";
import { PrismaClient } from "@prisma/client";
import {
  ChatListDto,
  ChatRatingDto,
  ChatRequestDto,
  ChatSelectDto,
  ChatStatusDto,
  VetRegionDto,
} from "../dtos/chatDto";
import { KORDATE } from "../../utils/constant";
const prisma = new PrismaClient();

class ChatService {
  static async addRequest(chatRequestDto: ChatRequestDto, userEmail: string) {
    try {
      const duplicateCheck = await prisma.chat_rooms.findFirst({
        where: {
          user_email: userEmail,
          user_vet_email: chatRequestDto.vetEmail,
        },
        orderBy: {
          updated_at: "desc",
        },
      });
      if (
        duplicateCheck?.status === "pending" ||
        duplicateCheck?.status === "accepted"
      ) {
        return "이미 상담(대기)중인 상태입니다.";
      }
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
            {
              OR: [
                {
                  user_email: email,
                  NOT: {
                    is_user_exit: true,
                  },
                },
                {
                  user_vet_email: email,
                  NOT: {
                    is_vet_exit: true,
                  },
                },
              ],
            },
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
      let writable: boolean = false,
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
        select: {
          status: true,
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
      if (checkStatus?.status == "accepted") {
        writable = true;
      } else {
        if (
          email == checkStatus?.users_chat_rooms_user_vet_emailTousers?.email
        ) {
          editable = true;
        }
      }

      return { ChatContents, checkStatus, writable, editable };
    } catch (error) {
      throw error;
    }
  }

  static async chatStatus(chatStatusDto: ChatStatusDto, vetEmail: string) {
    try {
      await prisma.chat_rooms.updateMany({
        where: { id: chatStatusDto.id, user_vet_email: vetEmail },
        data: {
          status: chatStatusDto.status,
          updated_at: new Date(Date.now() + KORDATE),
        },
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
          updated_at: new Date(Date.now() + KORDATE),
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

  static async rateChat(chatratingDto: ChatRatingDto) {
    try {
      const chatRoom = await prisma.chat_rooms.update({
        where: { id: chatratingDto.id },
        data: { grade: chatratingDto.grade },
      });
      const chatRoomsWithGrade = await prisma.chat_rooms.findMany({
        where: { user_vet_email: chatRoom?.user_vet_email },
      });
      let sumOfGrades = 0;
      let numOfGrades = 0;
      for (const chatRoom of chatRoomsWithGrade) {
        if (chatRoom.grade !== null) {
          sumOfGrades += chatRoom.grade;
          numOfGrades++;
        }
      }
      const averageGrade = sumOfGrades / numOfGrades;
      await prisma.vets.updateMany({
        where: { user_email: chatRoom?.user_vet_email },
        data: {
          grade: averageGrade,
          updated_at: new Date(Date.now() + KORDATE),
        },
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  static async exitChat(id: number, userId: string) {
    try {
      const chatRoom = await prisma.chat_rooms.findUnique({
        where: { id: id },
      });
      if (chatRoom?.user_email == userId) {
        await prisma.chat_rooms.update({
          where: { id: id },
          data: { is_user_exit: true, status: "completed" },
        });
      } else if (chatRoom?.user_vet_email == userId) {
        await prisma.chat_rooms.update({
          where: { id: id },
          data: { is_vet_exit: true, status: "completed" },
        });
      }
    } catch (error) {
      throw error;
    }
  }
}

export { ChatService };
