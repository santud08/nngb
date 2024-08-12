import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { siteValidation } from "../../validations/index.js";
import { validateApiKey, validateAccessToken } from "../../middleware/index.js";

const opinionRouter = Router();

opinionRouter.post(
  "/",
  validateApiKey,
  validateAccessToken,
  siteController.opinionController.getOpinions,
);

opinionRouter.post(
  "/save",
  validateApiKey,
  validateAccessToken,
  siteValidation.opinionValidation.saveOpinion,
  siteController.opinionController.saveOpinion,
);

export { opinionRouter };
