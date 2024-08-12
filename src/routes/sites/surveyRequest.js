import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import {
  validateApiKey,
  validateAccessToken,
  importFileUploadAddSurvey,
} from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";
import { customFileHelper } from "../../helpers/index.js";

const surveyRequestRouter = Router();

surveyRequestRouter.post(
  "/add",
  validateApiKey,
  validateAccessToken,
  customFileHelper.customFileUpload(importFileUploadAddSurvey.array("attachments", 10)),
  siteValidation.surveyRequestValidation.addSurvey,
  siteController.surveyRequestController.addSurvey,
);

export { surveyRequestRouter };
