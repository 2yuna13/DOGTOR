import { Router } from "express";
import { AdminController } from "../controllers/adminController";

const AdminRouter = Router();

//admin 권한 required

//확인안한 수의사 인증 신청 목록 불러오기 (시간 오래된 순)
AdminRouter.get(
  "/admin/vetrequests/lists",
  AdminController.vetRequestListsController
);

//수의사 인증 상태 변경 (승인, 거절)
AdminRouter.put(
  "/admin/vetrequests/status",
  AdminController.manageVetRequestsController
);

export { AdminRouter };
