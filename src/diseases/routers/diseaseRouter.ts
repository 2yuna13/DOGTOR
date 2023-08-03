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

export { DiseaseRouter };
