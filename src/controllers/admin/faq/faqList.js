import * as model from "../../../models/index.js";
import { Op } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";

/**
 * faqList
 * Get a list of FAQs with optional search parameters and pagination.
 * @param req
 * @param res
 * @param next
 */

export const faqList = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defaultPageNo = 1;
    const page = reqBody.page ? reqBody.page : defaultPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "created_at";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "desc"; // Change to ASC for FAQ titles
    const searchParams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
      raw: true,
      queryLog: true,
    };
    const searchParamsInput = reqBody.search_params ? reqBody.search_params : {};

    const conditions = {};

    if (searchParamsInput.is_exposed === "active" || searchParamsInput.is_exposed === "inactive") {
      conditions.status = searchParamsInput.is_exposed;
    } else {
      conditions.status = {
        [Op.ne]: "deleted", // Exclude records with status 'deleted'
      };
    }

    if (searchParamsInput && searchParamsInput.faq_category_id) {
      conditions.faq_category_id = searchParamsInput.faq_category_id;
    }

    if (searchParamsInput && searchParamsInput.faq_title) {
      conditions.faq_title = {
        [Op.like]: `%${searchParamsInput.faq_title}%`,
      };
    }

    if (searchParamsInput && searchParamsInput.start_date && !searchParamsInput.end_date) {
      conditions.created_at = {
        [Op.gte]: searchParamsInput.start_date,
      };
    } else if (searchParamsInput && !searchParamsInput.start_date && searchParamsInput.end_date) {
      conditions.created_at = {
        [Op.lte]: searchParamsInput.end_date,
      };
    } else if (searchParamsInput && searchParamsInput.start_date && searchParamsInput.end_date) {
      conditions.created_at = {
        [Op.between]: [searchParamsInput.start_date, searchParamsInput.end_date],
      };
    }

    const includeArray = []; // You can define any necessary include associations here

    const attributes = [
      "id",
      "faq_title",
      "faq_description",
      "faq_category_id",
      "status",
      "created_at",
    ];

    const getFAQList = await paginationService.pagination(
      searchParams,
      model.db.faq, // Update this to the correct FAQ model
      includeArray,
      conditions,
      attributes,
    );

    return res.ok({
      page: page,
      limit: limit,
      total_records: getFAQList.count,
      total_pages: getFAQList.count > 0 ? Math.ceil(getFAQList.count / limit) : 0,
      results: getFAQList.rows,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
