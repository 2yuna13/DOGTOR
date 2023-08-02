import { Router } from "express";
import { AdminController } from "../controllers/adminController";
import validationMiddleware from "../../middlewares/validateDto";
import { VetStatusDto, UserStatusDto } from "../dtos/adminDto";
import passport from "passport";
import PermissionValidation from "../../middlewares/permission";
const AdminRouter = Router();

//admin 권한 required

//확인안한 수의사 인증 신청 목록 불러오기 (시간 오래된 순)
AdminRouter.get(
  "/admins/vet-requests",
  passport.authenticate("jwt", { session: false }),
  PermissionValidation("admin"),
  AdminController.vetRequestListsController
);

//수의사 인증 상태 변경 (승인, 거절)
AdminRouter.put(
  "/admins/vet-requests/status",
  passport.authenticate("jwt", { session: false }),
  PermissionValidation("admin"),
  validationMiddleware(VetStatusDto),
  AdminController.manageVetRequestsController
);

//유저목록 조회(role별, block 여부, delete 여부)
AdminRouter.get(
  "/admins/users",
  passport.authenticate("jwt", { session: false }),
  PermissionValidation("admin"),
  AdminController.userListcontroller
);

// 유저 상태 변경 (정지, 탈퇴, 정지 해제)
AdminRouter.put(
  "/admins/users",
  passport.authenticate("jwt", { session: false }),
  PermissionValidation("admin"),
  validationMiddleware(UserStatusDto),
  AdminController.manageUserController
);

// 게시글 신고 목록 조회
AdminRouter.get(
  "/admins/report-posts",
  passport.authenticate("jwt", { session: false }),
  PermissionValidation("admin"),
  AdminController.postListcontroller
);

// 댓글 신고 목록 조회
AdminRouter.get(
  "/admins/report-comments",
  passport.authenticate("jwt", { session: false }),
  PermissionValidation("admin"),
  AdminController.commentListcontroller
);

// 신고 목록 처리 (상태 변경)

export { AdminRouter };
