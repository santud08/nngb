import * as model from "../../../models/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { StatusError } from "../../../config/index.js";

/**
 * Increment click count for a banner
 * @param req
 * @param res
 */

export const clickCount = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId;
    const bannerId = reqBody.banner_id || null;

    // Check if bannerId is provided
    if (!bannerId) {
      throw StatusError.badRequest(res.__("Banner ID is required."));
    }

    
    // Retrieve the existing bannerClickCount record by banner_id
    const existingBannerClickCount = await model.db.bannerClickCount.findOne({
      where: { banner_id: bannerId },
    });

    // Check if the bannerClickCount record exists
    if (!existingBannerClickCount) {
      throw StatusError.notFound(res.__("Banner Click Count not found."));
    }
    // Check if the banner exists
    if (!existingBannerClickCount) {
      throw StatusError.notFound(res.__("Banner not found."));
    }

    // Update click_count and view_date
    const newClickCount = (existingBannerClickCount.click_count || 0) + 1;
    const banners = {
      click_count: newClickCount,
      view_date: await customDateTimeHelper.getCurrentDateTime(),
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };

    // Update the banner with the new click_count and view_date
    await existingBannerClickCount.update(banners);

    return res.ok({ message: res.__("success") });
  } catch (error) {
    next(error);
  }
};
