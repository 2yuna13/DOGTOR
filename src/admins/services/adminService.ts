import { PrismaClient } from "@prisma/client";
import { UserListDto, VetListDto, VetStatusDto } from "../dtos/adminDto";

const prisma = new PrismaClient();

class AdminService {
  static async getVetRequestLists(vetListsDto: VetListDto) {
    try {
      const vetRequests = await prisma.vets.findMany({
        where: {
          status: vetListsDto.status,
        },
        orderBy: {
          updated_at: "asc",
        },
      });
      return vetRequests;
    } catch (error) {
      throw error;
    }
  }

  static async manageVetRequests(vetStatusDto: VetStatusDto) {
    try {
      const updateVet = await prisma.vets.update({
        where: {
          id: vetStatusDto.id,
        },
        data: {
          status: vetStatusDto.status,
        },
      });
      if (updateVet.status == "accepted") {
        await prisma.users.update({
          where: {
            email: vetStatusDto.email,
          },
          data: {
            role: "vet",
          },
        });
      }
      return updateVet;
    } catch (error) {
      throw error;
    }
  }

  static async getUserList(userListDto: UserListDto) {
    try {
      if (userListDto.role) {
        return await prisma.users.findMany({
          where: {
            role: userListDto.role,
          },
        });
      } else if (userListDto.type) {
        return await prisma.users.findMany({
          where: {
            user_type: userListDto.type,
          },
        });
      } else if (userListDto.blocked) {
        return await prisma.users.findMany({
          where: {
            blocked_at: {
              not: null,
            },
          },
        });
      } else {
        return await prisma.users.findMany();
      }
    } catch (error) {
      throw error;
    }
  }
}

export { AdminService };
