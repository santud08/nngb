import { Router } from "express";
import path from "path";
import { authRouter } from "./auth.js";
import { faqRouter } from "./faq.js";
import { announcementRouter } from "./announcement.js";
import { opinionRouter } from "./opinion.js";
import { siteRouter } from "./site.js";
import { inquiryRouter } from "./inquiry.js";
import { companyRouter } from "./company.js";
import { ncashRouter } from "./ncash.js";
import { couponRouter } from "./coupon.js";
import { surveyRequestRouter } from "./surveyRequest.js";
import { subpanelRouter } from "./subpanel.js";
import { eventRouter } from "./event.js";
import { mobileCouponRouter } from "./mobileCoupon.js";
import { myPageRouter } from "./myPage.js";
import { userRouter } from "./user.js";
import { bannerRouter } from "./banner.js";

const v1SiteRouter = Router();

// All auth routes will go here
v1SiteRouter.use("/", siteRouter);
v1SiteRouter.use("/auth", authRouter);
v1SiteRouter.use("/user", userRouter);
v1SiteRouter.use("/faq", faqRouter);
v1SiteRouter.use("/announcement", announcementRouter);
v1SiteRouter.use("/opinion", opinionRouter);
v1SiteRouter.use("/company", companyRouter);
v1SiteRouter.use("/ncash", ncashRouter);
v1SiteRouter.use("/coupon", couponRouter);
v1SiteRouter.use("/survey-request", surveyRequestRouter);

v1SiteRouter.use("/event", eventRouter);
v1SiteRouter.use("/mobile-coupon", mobileCouponRouter);
v1SiteRouter.use("/my-page", myPageRouter);
v1SiteRouter.use("/my-page/inquiry", inquiryRouter);
v1SiteRouter.use("/my-page/subpanel", subpanelRouter);
v1SiteRouter.use("/banner", bannerRouter);
//start used for testing purpose
v1SiteRouter.get("/image/logo", (req, res) => {
  res.sendFile(path.resolve("src/assets/images/logo", "logo.png"));
});

//end used for testing purpose
export { v1SiteRouter };
