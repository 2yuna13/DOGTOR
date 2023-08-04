import { PrismaClient, Prisma } from "@prisma/client";
import {
  UserListDto,
  UserStatusDto,
  VetListDto,
  VetStatusDto,
  ReportListDto,
  ReportStatusDto,
} from "../dtos/adminDto";

const prisma = new PrismaClient();

const currentDate = new Date();
currentDate.setHours(currentDate.getHours() + 9);

class AdminService {
  static async getVetRequestLists(
    vetListsDto: VetListDto,
    currentPage: number,
    rowPerPage: number
  ) {
    try {
      const startIndex = (currentPage - 1) * rowPerPage;
      const vetList = await prisma.vets.findMany({
        where: {
          status: vetListsDto.status,
        },
        orderBy: {
          updated_at: "asc",
        },
        skip: startIndex,
        take: rowPerPage,
      });

      const totalVetsCnt = await prisma.vets.count({
        where: { status: vetListsDto.status },
      });

      return { vetList, totalVetsCnt };
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
      }

      if (userListDto.status === "blocked") {
        where["blocked_at"] = { not: null };
      } else if (userListDto.status === "deleted") {
        where["deleted_at"] = { not: null };
      }

      if (userListDto.search) {
        where["OR"] = [
          { email: { contains: userListDto.search } },
          { nickname: { contains: userListDto.search } },
        ];
      }

      const orderBy: Prisma.usersOrderByWithRelationInput = {
        created_at:
          userListDto.orderBy === "asc"
            ? Prisma.SortOrder.asc
            : Prisma.SortOrder.desc,
      };

      const users = await prisma.users.findMany({
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

      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getTotalUsersCnt(userListDto: UserListDto) {
    try {
      const where: Prisma.usersWhereInput = {};

      if (userListDto.role) {
        where["role"] = userListDto.role;
      }

      if (userListDto.status === "blocked") {
        where["blocked_at"] = { not: null };
      } else if (userListDto.status === "deleted") {
        where["deleted_at"] = { not: null };
      }

      if (userListDto.search) {
        where["OR"] = [
          { email: { contains: userListDto.search } },
          { nickname: { contains: userListDto.search } },
        ];
      }

      const totalUsersCnt = await prisma.users.count({ where });

      return totalUsersCnt;
    } catch (error) {
      throw error;
    }
  }

  static async manageUsers(userStatusDto: UserStatusDto) {
    try {
      const { email, blocked, deleted } = userStatusDto;

      const user = await prisma.users.findUnique({ where: { email } });

      if (!user) {
        throw new Error("유저가 존재하지 않습니다.");
      }

      // 2주 정지
      if (blocked === "true") {
        const twoWeeksFromNow = new Date(currentDate);
        twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

        if (!user.blocked_at) {
          await prisma.users.update({
            where: { email },
            data: { blocked_at: twoWeeksFromNow },
          });
        } else {
          const blockedAt = new Date(user.blocked_at);
          blockedAt.setDate(blockedAt.getDate() + 14);

          await prisma.users.update({
            where: { email },
            data: { blocked_at: blockedAt },
          });
        }
      }

      // 정지 해제
      if (blocked === "false") {
        await prisma.users.update({
          where: { email },
          data: { blocked_at: null },
        });
      }

      // 영구 정지
      if (blocked === "permanent") {
        await prisma.users.update({
          where: { email },
          data: { blocked_at: new Date("9999-12-31") },
        });
      }

      // 강제 탈퇴
      if (deleted === "true") {
        await prisma.users.update({
          where: { email },
          data: { deleted_at: currentDate },
        });
      }
    } catch (error) {
      throw error;
    }
  }

  static async getPostList(
    reportListDto: ReportListDto,
    currentPage: number,
    rowPerPage: number
  ) {
    try {
      const status = reportListDto.status;
      const startIndex = (currentPage - 1) * rowPerPage;

      let reportedPostList;
      let totalPostsCnt;

      const where: Prisma.report_postsWhereInput = status
        ? {
            reports: {
              status: {
                in:
                  status === "completed" ? ["accepted", "rejected"] : [status],
              },
            },
          }
        : {};

      const baseQuery = prisma.report_posts.findMany({
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

      reportedPostList = await baseQuery;
      totalPostsCnt = await prisma.report_posts.count({
        where,
      });

      return { reportedPostList, totalPostsCnt };
    } catch (error) {
      throw error;
    }
  }

  static async getCommentList(
    reportListDto: ReportListDto,
    currentPage: number,
    rowPerPage: number
  ) {
    try {
      const status = reportListDto.status;
      const startIndex = (currentPage - 1) * rowPerPage;

      let reportedCommentList;
      let totalCommentsCnt;

      const where: Prisma.report_commentsWhereInput = status
        ? {
            reports: {
              status: {
                in:
                  status === "completed" ? ["accepted", "rejected"] : [status],
              },
            },
          }
        : {};

      const baseQuery = prisma.report_comments.findMany({
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

      reportedCommentList = await baseQuery;
      totalCommentsCnt = await prisma.report_comments.count({
        where,
      });

      return { reportedCommentList, totalCommentsCnt };
    } catch (error) {
      throw error;
    }
  }

  static async manageReports(reportStatusDto: ReportStatusDto) {
    try {
      const { id, status } = reportStatusDto;

      const report = await prisma.reports.findUnique({ where: { id } });
      const reportedPost = await prisma.report_posts.findMany({
        where: { report_id: id },
      });
      const reportedComment = await prisma.report_comments.findMany({
        where: { report_id: id },
      });

      if (!report) {
        throw new Error("신고 내역이 존재하지 않습니다.");
      }

      // 신고 내용 승인
      if (status === "accepted") {
        await prisma.reports.update({
          where: { id },
          data: {
            status: "accepted",
            updated_at: currentDate,
          },
        });

        if (reportedPost.length) {
          await prisma.posts.update({
            where: { id: reportedPost[0].post_id },
            data: {
              deleted_at: currentDate,
            },
          });
        } else if (reportedComment) {
          await prisma.comments.update({
            where: { id: reportedComment[0].comment_id },
            data: {
              deleted_at: currentDate,
            },
          });
        }
      }

      // 신고 내용 거절
      if (status === "rejected") {
        await prisma.reports.update({
          where: { id },
          data: {
            status: "rejected",
            updated_at: currentDate,
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }
}

export { AdminService };
