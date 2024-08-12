import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import {
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl,
} from "../../middleware/index.js";
import { adminValidation } from "../../validations/index.js";

const faqRouter = Router(); // Updated router name

faqRouter.post(
  "/",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("netpoint_management"),
  adminValidation.faqValidation.faqList,
  adminController.faqController.faqList,
);
faqRouter.post(
  "/save",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("netpoint_management"), //
  adminValidation.faqValidation.addFaq,
  adminController.faqController.addFaq,
);
faqRouter.get(
  "/details/:id",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("netpoint_management"),
  adminValidation.faqValidation.viewFaq,
  adminController.faqController.viewFaq,
);
faqRouter.post(
  "/delete",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("netpoint_management"),
  adminController.faqController.deleteFaq,
);

faqRouter.post(
  "/faq-category-list",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("netpoint_management"),
  adminController.faqController.faqCategoryList,
);
faqRouter.post(
  "/update",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("netpoint_management"), //
  adminValidation.faqValidation.updateFaq,
  adminController.faqController.updateFaq,
);
export { faqRouter }; // Updated export name
