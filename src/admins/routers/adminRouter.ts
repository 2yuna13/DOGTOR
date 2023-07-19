import { Router } from "express";
import { AdminController } from "../controllers/adminController";

const AdminRouter = Router();

//admin 권한 required

//확인안한 수의사 인증 신청 목록 불러오기
AdminRouter.get(
  "/admin/vetrequests/pending",
  AdminController.vetRequestPendingController
);

//수의사 인증 승인
AdminRouter.patch("/admin/vetrequests/accept");

export { AdminRouter };
