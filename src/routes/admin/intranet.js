import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import {
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl,
} from "../../middleware/index.js";

const intranetRouter = Router();

intranetRouter.post(
  "/",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("project_management"),
  adminController.intranetController.getAllIntranet,
);

export { intranetRouter };
