import * as model from "../../../models/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { StatusError } from "../../../config/index.js";

/**
 * addBanner
 * Create a new banner with the provided details.
 * @param req
 * @param res
 * @param next
 */

export const addBanner = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId;
    const reqFiles = req.files;
    const banners = {
      banner_name: reqBody.banner_name,
      exposure_period_start_date: reqBody.exposer_start_date,
      exposure_period_end_date: reqBody.exposer_end_date,
      link_url: reqBody.link_url,
      link_target: reqBody.link_target ? reqBody.link_target : "same_tab",
      acquisition_channel: reqBody.acquisition_channel,
      status: "active",
      created_by: userId,
      created_at: await customDateTimeHelper.getCurrentDateTime(),
    };
    // console.log(reqFiles.banner_image_mobile[0].location);
    if (reqFiles.banner_image_mobile) {
      banners.banner_image_mobile_original_filename = reqFiles.banner_image_mobile[0].originalname;
      banners.banner_image_mobile_filename = reqFiles.banner_image_mobile[0].key;
      banners.banner_image_mobile_path = reqFiles.banner_image_mobile[0].location;
    }
    if (reqFiles.banner_image_pc) {
      banners.banner_image_pc_original_filename = reqFiles.banner_image_pc[0].originalname;
      banners.banner_image_pc_filename = reqFiles.banner_image_pc[0].key;
      banners.banner_image_pc_path = reqFiles.banner_image_pc[0].location;
    }

    const createdbanners = await model.db.banner.create(banners);
    if (createdbanners) {
      const updatedData = {
        priority: createdbanners.id,
      };

      await model.db.banner.update(updatedData, {
        where: {
          id: createdbanners.id,
        },
      });

      const bannerclick = {
        banner_id: createdbanners.id,
        view_date: await customDateTimeHelper.getCurrentDateTime(),
        click_count: 0,
        status: "active",
        created_by: userId,
        created_at: await customDateTimeHelper.getCurrentDateTime(),
      };
      await model.db.bannerClickCount.create(bannerclick);

      return res.ok({ message: res.__("success") });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
