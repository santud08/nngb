import * as model from "../../../models/index.js";
import { Sequelize, Op } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";

/**
 * faqCategoryList
 * Get a list of FAQ categories with optional search parameters and pagination.
 * @param req
 * @param res
 * @param next
 */

export const faqCategoryList = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defaultPageNo = 1;
    const page = reqBody.page ? reqBody.page : defaultPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "id";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "desc";
    const searchParams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
      raw: true,
      queryLog: true,
    };
    // const searchParamsInput = reqBody.search_params ? reqBody.search_params : {};

    const conditions = {
      status: {
        [Op.ne]: "deleted", // Exclude records with status 'deleted'
      },
    };

    const includeArray = []; // You can define any necessary include associations here

    const attributes = ["id", "faq_category_name", "status", "created_at"];

    const getFAQCategoryList = await paginationService.pagination(
      searchParams,
      model.db.faqCategory, // Update this to the correct FAQ category model
      includeArray,
      conditions,
      attributes,
    );

    return res.ok({
      page: page,
      limit: limit,
      total_records: getFAQCategoryList.count,
      total_pages: getFAQCategoryList.count > 0 ? Math.ceil(getFAQCategoryList.count / limit) : 0,
      results: getFAQCategoryList.rows,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
