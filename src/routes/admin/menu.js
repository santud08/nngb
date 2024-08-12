import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import { validateApiKey, validateAdminAccessToken } from "../../middleware/index.js";
//import { adminValidation } from "../../validations/index.js";

const menuRouter = Router();

menuRouter.get(
  "/list",
  validateApiKey,
  validateAdminAccessToken,
  adminController.menuController.adminMenus,
);

export { menuRouter };
