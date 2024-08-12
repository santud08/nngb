import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import { adminValidation } from "../../validations/index.js";
import {
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl,
} from "../../middleware/index.js";

const subpanelRouter = Router();

subpanelRouter.post(
  "/",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("member_management"),
  adminValidation.subpanelValidation.getSubpanels,
  adminController.subpanelController.getSubpanels,
);

subpanelRouter.get(
  "/details/:id",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("member_management"),
  adminValidation.subpanelValidation.viewSubpanel,
  adminController.subpanelController.viewSubpanel,
);

subpanelRouter.post(
  "/save",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("member_management"),
  adminValidation.subpanelValidation.saveSubpanel,
  adminController.subpanelController.saveSubpanel,
);

subpanelRouter.post(
  "/update",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("member_management"),
  adminValidation.subpanelValidation.updateSubpanel,
  adminController.subpanelController.updateSubpanel,
);

subpanelRouter.post(
  "/delete",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("member_management"),
  adminValidation.subpanelValidation.deleteSubpanel,
  adminController.subpanelController.deleteSubpanel,
);

export { subpanelRouter };
