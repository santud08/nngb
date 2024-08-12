import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey, validateAccessToken, accessTokenIfAny } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";

const userRouter = Router();

userRouter.post(
  "/check-email",
  validateApiKey,
  accessTokenIfAny,
  siteValidation.userValidation.checkEmail,
  siteController.userController.checkEmail,
);

userRouter.post(
  "/check-mobile",
  validateApiKey,
  accessTokenIfAny,
  siteValidation.userValidation.checkMobile,
  siteController.userController.checkMobile,
);

userRouter.post(
  "/check-duplicate-id",
  validateApiKey,
  accessTokenIfAny,
  siteValidation.userValidation.checkDuplicateId,
  siteController.userController.checkDuplicateId,
);

userRouter.post(
  "/setting-password",
  validateApiKey,
  siteValidation.userValidation.settingPassword,
  siteController.userController.settingPassword,
);

userRouter.get(
  "/profile/details",
  validateApiKey,
  validateAccessToken,
  siteController.userController.profileDetails,
);

export { userRouter };
