import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { siteValidation } from "../../validations/index.js";
import { validateApiKey, validateAccessToken } from "../../middleware/index.js";

const subpanelRouter = Router();

subpanelRouter.post(
  "/current-panels",
  validateApiKey,
  validateAccessToken,
  siteValidation.subpanelValidation.currentSubpanels,
  siteController.subpanelController.currentSubpanels,
);

subpanelRouter.get(
  "/join/list/panels",
  validateApiKey,
  validateAccessToken,
  siteController.subpanelController.joinSubpanelList,
);

subpanelRouter.get(
  "/question-answers/panel/:id",
  validateApiKey,
  validateAccessToken,
  siteController.subpanelController.questionAnswers,
);

subpanelRouter.post(
  "/join/panel/registration",
  validateApiKey,
  validateAccessToken,
  siteValidation.subpanelValidation.joinToSubpanel,
  siteController.subpanelController.joinToSubpanel,
);

subpanelRouter.post(
  "/secession",
  validateApiKey,
  validateAccessToken,
  siteValidation.subpanelValidation.subpanelWithdrawal,
  siteController.subpanelController.subpanelWithdrawal,
);
export { subpanelRouter };
