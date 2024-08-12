import * as model from "../../../models/index.js";
import { Sequelize, Op } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";

/**
 * bannerList
 * Get a list of banners with optional search parameters and pagination.
 * @param req
 * @param res
 * @param next
 */

export const bannerList = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defautlPageNo = 1;
    const page = reqBody.page ? reqBody.page : defautlPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "priority";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "DESC";
    const sortOrderObj = [
      ["status", "asc"],
      [sortBy, sortOrder], // Sorting by status in ascending order
    ];
    const searchParams = {
      page: page,
      limit: limit,
      //sortBy: sortBy,
      //sortOrder: sortOrder,
      sortOrderObj: sortOrderObj,
      raw: true,
      queryLog: true,
    };
    const searchParamsInput = reqBody.search_params ? reqBody.search_params : {};

    const conditions = {
      status: { [Op.ne]: "deleted" },
      // acquisition_channel: searchParamsInput.acquisition_channel,
    };

    if (searchParamsInput && searchParamsInput.banner_name) {
      conditions.banner_name = {
        [Op.like]: `%${searchParamsInput.banner_name}%`,
      };
    }

    if (searchParamsInput && searchParamsInput.start_date && !searchParamsInput.end_date) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("banner.created_at")),
        {
          [Op.gte]: searchParamsInput.start_date,
        },
      );
    } else if (searchParamsInput && !searchParamsInput.start_date && searchParamsInput.end_date) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("banner.created_at")),
        {
          [Op.lte]: searchParamsInput.end_date,
        },
      );
    } else if (searchParamsInput && searchParamsInput.start_date && searchParamsInput.end_date) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("banner.created_at")),
        {
          [Op.between]: [searchParamsInput.start_date, searchParamsInput.end_date],
        },
      );
    }

    if (searchParamsInput && searchParamsInput.is_exposed !== undefined) {
      if (searchParamsInput.is_exposed === "true") {
        conditions.priority = { [Op.not]: null };
      } else if (searchParamsInput.is_exposed === "false") {
        conditions.priority = null;
      }
    }
    if (searchParamsInput && searchParamsInput.acquisition_channel) {
      conditions.acquisition_channel = searchParamsInput.acquisition_channel;
    }

    const includeArray = [
      {
        model: model.db.bannerClickCount,
        // where: { status: "active" },
        attributes: [["id", "click_id"], "click_count", "view_date"],
        required: true,
      },
    ];

    const attributes = [
      ["id", "banner_id"],
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
      "acquisition_channel",
      "priority",
      "status",
      "created_at",
    ];

    // You can now use the 'attributes' array to reference the attribute names as needed.

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
