import { PrismaClient, chat_rooms_status, vet_region } from "@prisma/client";
import { KORDATE } from "../../utils/constant";

const prisma = new PrismaClient();

class ChatRepository {
  static async findChatByUserAndVetEmail(userEmail: string, vetEmail: string) {
    try {
      return await prisma.chat_rooms.findFirst({
        where: {
          user_email: userEmail,
          user_vet_email: vetEmail,
        },
        orderBy: {
          updated_at: "desc",
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async createChatByUserAndVetEamil(
    userEmail: string,
    vetEmail: string
  ) {
    try {
      return await prisma.chat_rooms.create({
        data: {
          user_email: userEmail,
          user_vet_email: vetEmail,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async createChatContents(
    chatRoom_id: number,
    isFrom_user: boolean,
    sentEmail: string,
    message: string
  ) {
    try {
      return await prisma.chat_contents.create({
        data: {
          chat_room_id: chatRoom_id,
          is_from_user: isFrom_user,
          from_id: sentEmail,
          message: message,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async findChatByStatus(email: string, status: chat_rooms_status) {
    try {
      return await prisma.chat_rooms.findMany({
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
            { status: status },
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
    } catch (error) {
      throw error;
    }
  }

  static async findChatContentsByIdAndEmail(id: number, email: string) {
    try {
      return await prisma.chat_contents.findMany({
        where: {
          chat_room_id: id,
          chat_rooms: {
            OR: [{ user_email: email }, { user_vet_email: email }],
          },
        },
        orderBy: { created_at: "asc" },
      });
    } catch (error) {
      throw error;
    }
  }

  static async findUniqueChatRoomById(id: number) {
    try {
      return await prisma.chat_rooms.findUnique({
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
    } catch (error) {
      throw error;
    }
  }

  static async updateChatRoomStatus(
    id: number,
    status: chat_rooms_status,
    vetEmail: string
  ) {
    try {
      return await prisma.chat_rooms.updateMany({
        where: { id: id, user_vet_email: vetEmail },
        data: {
          status: status,
          updated_at: new Date(Date.now() + KORDATE),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async findChatByIdAndStatus(id: number, status: chat_rooms_status) {
    try {
      return await prisma.chat_rooms.findFirst({
        where: {
          AND: [{ id: id }, { status: status }],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateChatRoomUpdated(id: number) {
    try {
      return await prisma.chat_rooms.update({
        where: { id: id },
        data: {
          updated_at: new Date(Date.now() + KORDATE),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async findUserByEmail(email: string) {
    try {
      return await prisma.users.findUnique({
        where: { email: email },
      });
    } catch (error) {
      throw error;
    }
  }

  static async countVets() {
    try {
      return await prisma.vets.count();
    } catch (error) {
      throw error;
    }
  }

  static async countVetsByRegion(region: vet_region) {
    try {
      return await prisma.vets.count({
        where: { region: region },
      });
    } catch (error) {
      throw error;
    }
  }

  static async countVetsByNameOrHospitalName(search: string) {
    try {
      return await prisma.vets.count({
        where: {
          OR: [
            { name: { contains: search } },
            { hospital_name: { contains: search } },
          ],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async countVetsByRegionAndName(search: string, region: vet_region) {
    try {
      return await prisma.vets.count({
        where: {
          AND: [
            {
              OR: [
                { name: { contains: search } },
                { hospital_name: { contains: search } },
              ],
            },
            { region: region },
          ],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async findVetsByPage(startIndex: number, rowPerPage: number) {
    try {
      return await prisma.vets.findMany({
        skip: startIndex,
        take: rowPerPage,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findVetsByRegionAndPage(
    region: vet_region,
    startIndex: number,
    rowPerPage: number
  ) {
    try {
      return await prisma.vets.findMany({
        where: { region: region },
        skip: startIndex,
        take: rowPerPage,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findVetsByNameAndPage(
    search: string,
    startIndex: number,
    rowPerPage: number
  ) {
    try {
      return await prisma.vets.findMany({
        where: {
          OR: [
            { name: { contains: search } },
            { hospital_name: { contains: search } },
          ],
        },
        skip: startIndex,
        take: rowPerPage,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findVetsByRegionAndNameAndPage(
    region: vet_region,
    search: string,
    startIndex: number,
    rowPerPage: number
  ) {
    try {
      return await prisma.vets.findMany({
        where: {
          AND: [
            {
              OR: [
                { name: { contains: search } },
                { hospital_name: { contains: search } },
              ],
            },
            { region: region },
          ],
        },
        skip: startIndex,
        take: rowPerPage,
      });
    } catch (error) {
      throw error;
    }
  }

  static async gradeChatRoomById(id: number, grade: number) {
    try {
      return await prisma.chat_rooms.update({
        where: { id: id },
        data: { grade: grade },
      });
    } catch (error) {
      throw error;
    }
  }

  static async findChatsByVetEmail(vetEmail: string) {
    try {
      return await prisma.chat_rooms.findMany({
        where: { user_vet_email: vetEmail },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateVetGrade(vetEmail: string, grade: number) {
    try {
      return await prisma.vets.updateMany({
        where: { user_email: vetEmail },
        data: {
          grade: grade,
          updated_at: new Date(Date.now() + KORDATE),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateUserChatExit(id: number) {
    try {
      return await prisma.chat_rooms.update({
        where: { id: id },
        data: {
          is_user_exit: true,
          status: "completed",
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateVetChatExit(id: number) {
    try {
      return await prisma.chat_rooms.update({
        where: { id: id },
        data: {
          is_vet_exit: true,
          status: "completed",
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export { ChatRepository };
