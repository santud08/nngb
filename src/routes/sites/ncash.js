import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey } from "../../middleware/index.js";
//import { siteValidation } from "../../validations/index.js";

const ncashRouter = Router();

ncashRouter.post(
  "/get-ncash-status",
  validateApiKey,
  siteController.nCashController.getNcashStatus,
);

ncashRouter.post("/lookup-ncash", validateApiKey, siteController.nCashController.lookupNcash);

ncashRouter.post("/earn-ncash", validateApiKey, siteController.nCashController.earnNcash);

ncashRouter.post("/spent-ncash", validateApiKey, siteController.nCashController.spentNcash);

ncashRouter.post("/confirm-ncash", validateApiKey, siteController.nCashController.confirmNcash);

ncashRouter.get("/view-html-ncash", siteController.nCashController.viewHtmlNcash);

export { ncashRouter };
