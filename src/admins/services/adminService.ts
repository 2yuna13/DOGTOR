import { Prisma } from "@prisma/client";
import {
  UserListDto,
  UserStatusDto,
  VetListDto,
  VetStatusDto,
  ReportListDto,
  ReportStatusDto,
} from "../dtos/adminDto";
import { KORDATE } from "../../utils/constant";
import { AdminRepository } from "../repositories/adminRepository";
import { start } from "repl";

class AdminService {
  static async getVetRequestLists(
    vetListsDto: VetListDto,
    currentPage: number,
    rowPerPage: number
  ) {
    try {
      const startIndex = (currentPage - 1) * rowPerPage;
      const vetList = await AdminRepository.findVetsByStatusAndPage(
        vetListsDto.status,
        startIndex,
        rowPerPage
      );

      const totalVetsCnt = await AdminRepository.countVetsByStatus(
        vetListsDto.status
      );
      return { vetList, totalVetsCnt };
    } catch (error) {
      throw error;
    }
  }

  static async manageVetRequests(vetStatusDto: VetStatusDto) {
    try {
      const updateVet = await AdminRepository.updateVetStatus(
        vetStatusDto.id,
        vetStatusDto.status
      );
      if (updateVet.status == "accepted") {
        await AdminRepository.updateUserRole(vetStatusDto.email, "vet");
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

      const users =
        await AdminRepository.findUsersByRoleAndStatusAndSearchAndPage(
          where,
          orderBy,
          startIndex,
          rowPerPage
        );

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

      const totalUsersCnt =
        await AdminRepository.countUsersByRoleAndStatusAndSearch(where);

      return totalUsersCnt;
    } catch (error) {
      throw error;
    }
  }

  static async manageUsers(userStatusDto: UserStatusDto) {
    try {
      const { email, blocked, deleted } = userStatusDto;

      const user = await AdminRepository.findUserByEmail(email);

      if (!user) {
        throw new Error("유저가 존재하지 않습니다.");
      }

      // 2주 정지
      if (blocked === "true") {
        const twoWeeksFromNow = new Date(Date.now() + KORDATE);
        twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

        if (!user.blocked_at) {
          await AdminRepository.blockUserByEmail(email, twoWeeksFromNow);
        } else {
          const blockedAt = new Date(user.blocked_at);
          blockedAt.setDate(blockedAt.getDate() + 14);

          await AdminRepository.blockUserByEmail(email, blockedAt);
        }
      }

      // 정지 해제
      if (blocked === "false") {
        await AdminRepository.unBlockUserByEmail(email);
      }

      // 영구 정지
      if (blocked === "permanent") {
        await AdminRepository.blockUserByEmail(email, new Date("9999-12-31"));
      }

      // 강제 탈퇴
      if (deleted === "true") {
        await AdminRepository.deleteUserByEmail(email);
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

      const reportedPostList = await AdminRepository.findReportedPosts(
        where,
        startIndex,
        rowPerPage
      );

      const totalPostsCnt = await AdminRepository.countReportedPosts(where);

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

      const reportedCommentList = await AdminRepository.findReportedComments(
        where,
        startIndex,
        rowPerPage
      );
      const totalCommentsCnt = await AdminRepository.countReportedComments(
        where
      );

      return { reportedCommentList, totalCommentsCnt };
    } catch (error) {
      throw error;
    }
  }

  static async manageReports(reportStatusDto: ReportStatusDto) {
    try {
      const { id, status } = reportStatusDto;

      const report = await AdminRepository.findReportById(id);
      const reportedPost = await AdminRepository.findReportedPostById(id);
      const reportedComment = await AdminRepository.findReportedCommentById(id);

      if (!report) {
        throw new Error("신고 내역이 존재하지 않습니다.");
      }

      // 신고 내용 승인
      if (status === "accepted") {
        await AdminRepository.updateReportStatus(id, "accepted");

        if (reportedPost.length) {
          await AdminRepository.deletePostById(reportedPost[0].post_id);
        } else if (reportedComment) {
          await AdminRepository.deleteCommentById(
            reportedComment[0].comment_id
          );
        }
      }

      // 신고 내용 거절
      if (status === "rejected") {
        await AdminRepository.updateReportStatus(id, "rejected");
      }
    } catch (error) {
      throw error;
    }
  }
}

export { AdminService };
