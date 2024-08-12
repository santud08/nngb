import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import {
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl,
  importFileUploadBanner,
} from "../../middleware/index.js";
import { adminValidation } from "../../validations/index.js";
import { customFileHelper } from "../../helpers/index.js";

const bannerRouter = Router(); // Updated router name

bannerRouter.post(
  "/",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("netpoint_management"),
  adminValidation.bannerValidation.bannerList,
  adminController.bannerController.bannerList,
);
bannerRouter.post(
  "/save",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("netpoint_management"), //
  customFileHelper.customFileUpload(
    importFileUploadBanner.fields([
      { name: "banner_image_pc", maxCount: 1 },
      { name: "banner_image_mobile", maxCount: 1 },
    ]),
  ),
  adminValidation.bannerValidation.addBanner,
  adminController.bannerController.addBanner,
);
bannerRouter.get(
  "/details/:id",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("netpoint_management"),
  adminValidation.bannerValidation.viewBanner,
  adminController.bannerController.viewBanner,
);
bannerRouter.post(
  "/update",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("netpoint_management"),
  customFileHelper.customFileUpload(
    importFileUploadBanner.fields([
      { name: "banner_image_pc", maxCount: 1 },
      { name: "banner_image_mobile", maxCount: 1 },
    ]),
  ),
  adminValidation.bannerValidation.updateBanner,
  adminController.bannerController.updateBanner,
);
bannerRouter.post(
  "/order-change",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("netpoint_management"),
  adminValidation.bannerValidation.orderChange,
  adminController.bannerController.orderChange,
);
bannerRouter.post(
  "/delete",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("netpoint_management"),
  adminController.bannerController.deleteBanner,
);

export { bannerRouter }; // Updated export name
