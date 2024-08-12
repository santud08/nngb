import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey, validateAccessToken } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";

const myPageRouter = Router();

myPageRouter.get(
  "/recommender/list",
  validateApiKey,
  validateAccessToken,
  siteController.userController.recommenderList,
);

myPageRouter.post(
  "/ncash/cash-details",
  validateApiKey,
  validateAccessToken,
  siteValidation.nCashValidation.cashDetails,
  siteController.nCashController.cashDetails,
);

myPageRouter.post(
  "/user/verify-password",
  validateApiKey,
  validateAccessToken,
  siteValidation.userValidation.varifyPassword,
  siteController.userController.verifyPassword,
);

myPageRouter.get(
  "/user/details",
  validateApiKey,
  validateAccessToken,
  siteController.userController.userDetails,
);

myPageRouter.post(
  "/user/update/profile",
  validateApiKey,
  validateAccessToken,
  siteValidation.userValidation.updateProfile,
  siteController.userController.updateProfile,
);

myPageRouter.post(
  "/user/withdrawal/membership",
  validateApiKey,
  validateAccessToken,
  siteController.userController.membershipWithdrawal,
);

export { myPageRouter };
