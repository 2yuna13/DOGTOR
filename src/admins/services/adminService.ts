import { PrismaClient, Prisma } from "@prisma/client";
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

  static async getUserList(
    userListDto: UserListDto,
    startIndex: number,
    rowPerPage: number
  ) {
    try {
      const where: Prisma.usersWhereInput = {};

      if (userListDto.role) {
        where["role"] = userListDto.role;
      } else if (userListDto.blocked === "false") {
        where["blocked_at"] = null;
      } else if (userListDto.blocked === "true") {
        where["blocked_at"] = { not: null };
      } else if (userListDto.deleted === "false") {
        where["deleted_at"] = null;
      } else if (userListDto.deleted === "true") {
        where["deleted_at"] = { not: null };
      }

      const orderBy: Prisma.usersOrderByWithRelationInput = {
        updated_at: Prisma.SortOrder.asc,
      };

      const users = await prisma.users.findMany({
        where,
        orderBy,
        skip: startIndex,
        take: rowPerPage,
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getTotalUsersCnt(userListDto: UserListDto) {
    try {
      const where: Prisma.usersWhereInput = {};

      if (userListDto.role) {
        where.role = userListDto.role;
      } else if (userListDto.blocked === "false") {
        where.blocked_at = null;
      } else if (userListDto.blocked === "true") {
        where.blocked_at = { not: null };
      } else if (userListDto.deleted === "false") {
        where.deleted_at = null;
      } else if (userListDto.deleted === "true") {
        where.deleted_at = { not: null };
      }

      const totalUsersCnt = await prisma.users.count({ where });

      return totalUsersCnt;
    } catch (error) {
      throw error;
    }
  }
}

export { AdminService };
