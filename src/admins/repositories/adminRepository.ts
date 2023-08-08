import {
  Prisma,
  PrismaClient,
  reports_status,
  users_role,
  vet_status,
} from "@prisma/client";
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
      return await prisma.users.findUnique({ where: { email } });
    } catch (error) {
      throw error;
    }
  }

  static async blockUserByEmail(email: string, date: Date) {
    try {
      return await prisma.users.update({
        where: { email },
        data: { blocked_at: date },
      });
    } catch (error) {
      throw error;
    }
  }

  static async unBlockUserByEmail(email: string) {
    try {
      return await prisma.users.update({
        where: { email },
        data: { blocked_at: null },
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserByEmail(email: string) {
    try {
      return await prisma.users.update({
        where: { email },
        data: {
          blocked_at: null,
          deleted_at: new Date(Date.now() + KORDATE),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async findReportedPosts(
    where: Prisma.report_postsWhereInput,
    startIndex: number,
    rowPerPage: number
  ) {
    try {
      return await prisma.report_posts.findMany({
        where,
        select: {
          reports: {
            select: {
              id: true,
              content: true,
              status: true,
              created_at: true,
            },
          },
          posts: {
            select: {
              id: true,
              category: true,
              title: true,
              body: true,
              created_at: true,
              users: {
                select: {
                  email: true,
                  nickname: true,
                  img_path: true,
                  blocked_at: true,
                  deleted_at: true,
                },
              },
            },
          },
        },
        orderBy: {
          reports: {
            updated_at: "desc",
          },
        },
        skip: startIndex,
        take: rowPerPage,
      });
    } catch (error) {
      throw error;
    }
  }

  static async countReportedPosts(where: Prisma.report_postsWhereInput) {
    try {
      return await prisma.report_posts.count({
        where,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findReportedComments(
    where: Prisma.report_commentsWhereInput,
    startIndex: number,
    rowPerPage: number
  ) {
    try {
      return await prisma.report_comments.findMany({
        where,
        select: {
          reports: {
            select: {
              id: true,
              content: true,
              status: true,
              created_at: true,
            },
          },
          comments: {
            select: {
              id: true,
              body: true,
              created_at: true,
              users: {
                select: {
                  email: true,
                  nickname: true,
                  img_path: true,
                  blocked_at: true,
                  deleted_at: true,
                },
              },
            },
          },
        },
        orderBy: {
          reports: {
            updated_at: "desc",
          },
        },
        skip: startIndex,
        take: rowPerPage,
      });
    } catch (error) {
      throw error;
    }
  }

  static async countReportedComments(where: Prisma.report_commentsWhereInput) {
    try {
      return await prisma.report_comments.count({
        where,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findReportById(id: number) {
    try {
      return await prisma.reports.findUnique({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  static async findReportedPostById(id: number) {
    try {
      return await prisma.report_posts.findMany({
        where: { report_id: id },
      });
    } catch (error) {
      throw error;
    }
  }

  static async findReportedCommentById(id: number) {
    try {
      return await prisma.report_comments.findMany({
        where: { report_id: id },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateReportStatus(id: number, status: reports_status) {
    try {
      return await prisma.reports.update({
        where: { id },
        data: {
          status: status,
          updated_at: new Date(Date.now() + KORDATE),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async deletePostById(id: number) {
    try {
      return await prisma.posts.update({
        where: { id: id },
        data: {
          deleted_at: new Date(Date.now() + KORDATE),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteCommentById(id: number) {
    try {
      return await prisma.comments.update({
        where: { id: id },
        data: {
          deleted_at: new Date(Date.now() + KORDATE),
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export { AdminRepository };
