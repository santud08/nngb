import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey, accessTokenIfAny } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";

const siteRouter = Router();

siteRouter.get(
  "/download/file",
  siteValidation.downloadValidation.fileDownload,
  siteController.downloadController.fileDownload,
);

siteRouter.get("/get-user", validateApiKey, siteController.getOracleDbUsrController.users);

siteRouter.post(
  "/check-bank-id",
  validateApiKey,
  accessTokenIfAny,
  siteValidation.bankAccountValidation.checkBankId,
  siteController.bankIdController.checkBankId,
);

siteRouter.get(
  "/page/:slug",
  validateApiKey,
  accessTokenIfAny,
  siteController.pagesController.staticPages,
);

siteRouter.get(
  "/bank-list",
  validateApiKey,
  accessTokenIfAny,
  siteController.bankIdController.bankList,
);

siteRouter.get(
  "/appliance-list",
  validateApiKey,
  accessTokenIfAny,
  siteController.applianceController.applianceList,
);

siteRouter.get(
  "/hobby-list",
  validateApiKey,
  accessTokenIfAny,
  siteController.hobbyController.hobbyList,
);

siteRouter.get(
  "/sports-list",
  validateApiKey,
  accessTokenIfAny,
  siteController.sportsController.sportsList,
);

siteRouter.post(
  "/generate-phone-authentication",
  validateApiKey,
  accessTokenIfAny,
  siteController.niceTokenController.getNiceTokenApi,
);

siteRouter.get("/phone-auth-success", siteController.niceTokenController.phoneAuthSuccess);
siteRouter.get("/phone-auth-failure", siteController.niceTokenController.phoneAuthFailure);

siteRouter.post("/address-return-url", siteController.addressReturnData.addressReturnUrl);

export { siteRouter };
