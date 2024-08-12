import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper, generalHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * updateBanner
 * Update banner information based on the provided banner ID.
 * Users can update banner data and associated files.
 * @param req
 * @param res
 * @param next
 */
export const updateBanner = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId;
    const reqFiles = req.files;
    const bannerIdToUpdate = reqBody.id; // Specify the banner ID to update

    const updatedBanners = {
      banner_name: reqBody.banner_name,
      exposure_period_start_date: reqBody.exposer_start_date,
      exposure_period_end_date: reqBody.exposer_end_date,
      link_url: reqBody.link_url,
      link_target: reqBody.link_target ? reqBody.link_target : "same_tab",
      acquisition_channel: reqBody.acquisition_channel,
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };

    if (reqFiles.banner_image_mobile) {
      updatedBanners.banner_image_mobile_original_filename =
        reqFiles.banner_image_mobile[0].originalname;
      updatedBanners.banner_image_mobile_filename = reqFiles.banner_image_mobile[0].key;
      updatedBanners.banner_image_mobile_path = reqFiles.banner_image_mobile[0].location;
    }
    if (reqFiles.banner_image_pc) {
      updatedBanners.banner_image_pc_original_filename = reqFiles.banner_image_pc[0].originalname;
      updatedBanners.banner_image_pc_filename = reqFiles.banner_image_pc[0].key;
      updatedBanners.banner_image_pc_path = reqFiles.banner_image_pc[0].location;
    }

    // Find the banner to update based on its ID
    const bannerToUpdate = await model.db.banner.findByPk(bannerIdToUpdate);

    if (!bannerToUpdate) {
      throw StatusError.badRequest(res.__("Banner does not exist"));
    }

    // Update the banner with the new data
    const updatedBanner = await bannerToUpdate.update(updatedBanners);

    if (updatedBanner) {
      return res.ok({ message: res.__("success") });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
