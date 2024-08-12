import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import {
  adminUserAccessControl,
  validateAdminAccessToken,
  validateApiKey,
} from "../../middleware/index.js";
import { adminValidation } from "../../validations/index.js";

const surveyRouter = Router();

surveyRouter.post(
  "/list",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.surveyRequestValidation.getSurveyList,
  adminController.surveyRequestController.getSurveyList,
);

surveyRouter.get(
  "/details/:id",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.surveyRequestValidation.getSurveyDetails,
  adminController.surveyRequestController.viewSurvey,
);

surveyRouter.post(
  "/download/attachment",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.surveyRequestValidation.downloadSurveyFile,
  adminController.surveyRequestController.downloadSurveyFile,
);

export { surveyRouter };

