import * as model from "../../../models/index.js";
import { Op, col } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT, BTYPE_SETTINGS } from "../../../utils/constants.js";

/**
 * Get all business
 * @param req
 * @param res
 * @param next
 */

export const businessList = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defautlPageNo = 1;
    const page = reqBody.page ? reqBody.page : defautlPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "id";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "desc";
    const searchParams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };
    const searchParamsInput = reqBody.search_params ? reqBody.search_params : {};

    let conditions = {
      status: { [Op.ne]: "deleted" },
    };
    if (searchParamsInput && searchParamsInput.business_title) {
      conditions.business_name = {
        [Op.like]: `%${searchParamsInput.business_title}%`,
      };
    }

    if (searchParamsInput && searchParamsInput.business_id) {
      conditions.uuid = searchParamsInput.business_id;
    }

    if (searchParamsInput && searchParamsInput.btype) {
      conditions.btype = searchParamsInput.btype;
    }

    if (searchParamsInput && searchParamsInput.general_survey) {
      if (searchParamsInput.general_survey == "survey") {
        conditions.btype = BTYPE_SETTINGS.SURVEY_BTYPE;
      } else {
        conditions.btype = { [Op.ne]: BTYPE_SETTINGS.SURVEY_BTYPE };
      }
    }

    const selectAttributes = [
      "id",
      ["uuid", "business_id"],
      [col("businessType.title"), "btype"],
      [col("customer.customer_name"), "business_name"],
      ["business_name", "title"],
      "status",
      ["service_start_date", "start_date"],
      ["service_end_date", "end_date"],
    ];
    const includeArray = [
      {
        model: model.db.customer,
        where: { status: { [Op.ne]: "deleted" } },
        attributes: [],
        required: true,
      },
      {
        model: model.db.businessTypes,
        where: { status: "active" },
        attributes: [],
        required: true,
      },
    ];

    const getBusinessList = await paginationService.pagination(
      searchParams,
      model.db.business,
      includeArray,
      conditions,
      selectAttributes,
    );

    return res.ok({
      page: page,
      limit: limit,
      total_records: getBusinessList.count,
      total_pages: getBusinessList.count > 0 ? Math.ceil(getBusinessList.count / limit) : 0,
      results: getBusinessList.rows,
    });
  } catch (error) {
    next(error);
  }
};
