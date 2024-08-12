import { Router } from "express";
import { authRouter } from "./auth.js";
import { bannerRouter } from "./banner.js";
import { businessRouter } from "./business.js";
import { customerRouter } from "./customer.js";
import { faqRouter } from "./faq.js";
import { industryRouter } from "./industry.js";
import { inquiryRouter } from "./inquiry.js";
import { menuRouter } from "./menu.js";
import { productRouter } from "./product.js";
import { siteRouter } from "./site.js";
import { subProjectRouter } from "./subProject.js";
import { subpanelRouter } from "./subpanel.js";
import { surveyRouter } from "./surveyRequest.js";
import { userRouter } from "./user.js";
import { webhardRouter } from "./webhard.js";
import { intranetRouter } from "./intranet.js";

const v1AdminRouter = Router();
// All routes go here
//v1AdminRouter.use("/", userRouter);
v1AdminRouter.use("/", siteRouter);
v1AdminRouter.use("/auth", authRouter);
v1AdminRouter.use("/user", userRouter);
v1AdminRouter.use("/subpanel", subpanelRouter);
v1AdminRouter.use("/inquiry", inquiryRouter);
v1AdminRouter.use("/menu", menuRouter);
v1AdminRouter.use("/customer-management/survey", surveyRouter);
v1AdminRouter.use("/business", businessRouter);
v1AdminRouter.use("/customer", customerRouter);
v1AdminRouter.use("/project-management", industryRouter);
v1AdminRouter.use("/banner", bannerRouter);
v1AdminRouter.use("/project-management/industry", industryRouter);
v1AdminRouter.use("/webhard", webhardRouter);
v1AdminRouter.use("/product", productRouter);
v1AdminRouter.use("/faq", faqRouter);
v1AdminRouter.use("/intranet", intranetRouter);
v1AdminRouter.use("/project-management/sub-project", subProjectRouter);

export { v1AdminRouter };

