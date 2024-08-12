import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import * as model from "../../../models/index.js";

const { eTicketCodeCategory } = model.db;

/**
 * E ticket code categories list
 * @param req
 * @param res
 * @param next
 */
export const getCategories = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defautlPageNo = 1;
    const page = reqBody.page ? reqBody.page : defautlPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "";
    const searchParams = {
      page,
      limit,
      sortBy,
      sortOrder,
    };

    let includeConditions = { status: "active" };
    //Rows with pagination
    const getCategorieList = await paginationService.pagination(
      searchParams,
      eTicketCodeCategory,
      [],
      includeConditions,
      null,
    );

    return res.ok({
      page: page,
      limit: limit,
      total_records: getCategorieList.count,
      total_pages: getCategorieList.count > 0 ? Math.ceil(getCategorieList.count / limit) : 0,
      results: getCategorieList.rows,
    });
  } catch (error) {
    next(error);
  }
};
