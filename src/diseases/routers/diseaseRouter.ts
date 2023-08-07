import { Router } from "express";
import validationMiddleware from "../../middlewares/validateDto";
import passport from "passport";
import upload from "../../middlewares/upload";
import { DiseaseController } from "../controllers/diseaseController";

const DiseaseRouter = Router();

DiseaseRouter.post(
  "/diseases",
  upload.single("diseases"),
  passport.authenticate("jwt", { session: false }),
  DiseaseController.diseaseCheckController
);

//수의사 별점 top 5 반환
DiseaseRouter.get(
  "/diseases/vets",
  passport.authenticate("jwt", { session: false }),
  DiseaseController.getVetsController
);
export { DiseaseRouter };
