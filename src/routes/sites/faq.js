import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey } from "../../middleware/index.js";

const faqRouter = Router();

faqRouter.post("/", validateApiKey, siteController.faqController.getFaqs);

export { faqRouter };
