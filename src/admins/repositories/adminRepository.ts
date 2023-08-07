import { Prisma, PrismaClient, users_role, vet_status } from "@prisma/client";
import { KORDATE } from "../../utils/constant";

const prisma = new PrismaClient();

class AdminRepository {
  static async findVetsByStatusAndPage(
    status: vet_status,
    startIndex: number,
    rowPerPage: number
  ) {
    try {
      return await prisma.vets.findMany({
        where: {
          status: status,
        },
        include: { users: { select: { img_path: true } } },
        orderBy: {
          updated_at: "asc",
        },
        skip: startIndex,
        take: rowPerPage,
      });
    } catch (error) {
      throw error;
    }
  }

  static async countVetsByStatus(status: vet_status) {
    try {
      return await prisma.vets.count({
        where: { status: status },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateVetStatus(id: number, status: vet_status) {
    try {
      return prisma.vets.update({
        where: {
          id: id,
        },
        data: {
          status: status,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateUserRole(email: string, role: users_role) {
    try {
      return await prisma.users.update({
        where: {
          email: email,
        },
        data: {
          role: role,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async findUsersByRoleAndStatusAndSearchAndPage(
    where: Prisma.usersWhereInput,
    orderBy: Prisma.usersOrderByWithRelationInput,
    startIndex: number,
    rowPerPage: number
  ) {
    try {
      return await prisma.users.findMany({
        where,
        select: {
          email: true,
          nickname: true,
          role: true,
          img_path: true,
          created_at: true,
          blocked_at: true,
          deleted_at: true,
        },
        orderBy,
        skip: startIndex,
        take: rowPerPage,
      });
    } catch (error) {
      throw error;
    }
  }

  static async countUsersByRoleAndStatusAndSearch(
    where: Prisma.usersWhereInput
  ) {
    try {
      return await prisma.users.count({ where });
    } catch (error) {
      throw error;
    }
  }

  static async findUserByEmail(email: string) {
    try {
    } catch (error) {
      throw error;
    }
  }
}

export { AdminRepository };
