import { Router } from "express";
import { AdminController } from "../controllers/adminController";
import validationMiddleware from "../../middlewares/validateDto";
import { VetListDto, VetStatusDto } from "../dtos/adminDto";

const AdminRouter = Router();

//admin 권한 required

//확인안한 수의사 인증 신청 목록 불러오기 (시간 오래된 순)
AdminRouter.get(
  "/admins/vet-requests",
  validationMiddleware(VetListDto),
  AdminController.vetRequestListsController
);

//수의사 인증 상태 변경 (승인, 거절)
AdminRouter.put(
  "/admins/vet-requests/status",
  validationMiddleware(VetStatusDto),
  AdminController.manageVetRequestsController
);

export { AdminRouter };
