import * as model from "../../../models/index.js";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";

/**
 * getAllBanner
 * @param req
 * @param res
 */

export const getAllBanner = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defaultPageNo = 1;
    const page = reqBody.page ? reqBody.page : defaultPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;

    const sortBy = reqBody.sort_by ? reqBody.sort_by : "priority";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "DESC";
    const panel = reqBody.panel ? reqBody.panel : null;
    const searchParams = { page, limit, sortBy, sortOrder };

    const conditions = {
      status: "active", // Filter by status as needed for banners
    };

    if (panel) conditions.acquisition_channel = panel;

    const includeArray = [
      // Include related models as needed
      {
        model: model.db.bannerClickCount,
        attributes: ["click_count"],
        required: true,
      },
    ];

    const attributes = [
      "id",
      "banner_name",
      "exposure_period_start_date",
      "exposure_period_end_date",
      "banner_image_pc_original_filename",
      "banner_image_pc_filename",
      "banner_image_pc_path",
      "banner_image_mobile_original_filename",
      "banner_image_mobile_filename",
      "banner_image_mobile_path",
      "link_url",
      "link_target",
      "priority",
      "acquisition_channel",
      "created_at",
    ];

    const getBannerList = await paginationService.pagination(
      searchParams,
      model.db.banner,
      includeArray,
      conditions,
      attributes,
    );

    return res.ok({
      page: page,
      limit: limit,
      total_records: getBannerList.count,
      total_pages: getBannerList.count > 0 ? Math.ceil(getBannerList.count / limit) : 0,
      results: getBannerList.rows,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
