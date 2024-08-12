import * as model from "../../../models/index.js";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import { Op } from "sequelize";

/**
 * Get rgistered payment list
 * @param req
 * @param res
 * @param next
 */

export const getPaymentList = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defautlPageNo = 1;
    const page = reqBody.page ? reqBody.page : defautlPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "id";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "desc";
    const businessId = reqBody.business_id;
    const searchParams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };

    const selectAttributes = [
      "id",
      "business_id",
      ["transac_amount", "registration_amount"],
      "balance_amount",
      ["created_at", "registration_date"],
    ];
    const includeArray = [];
    const conditions = {
      business_id: businessId,
      status: { [Op.ne]: "deleted" },
    };

    //Rows with pagination
    const resultData = await paginationService.pagination(
      searchParams,
      model.db.businessPayments,
      includeArray,
      conditions,
      selectAttributes,
    );

    return res.ok({
      page: page,
      limit: limit,
      total_records: resultData.count,
      total_pages: resultData.count > 0 ? Math.ceil(resultData.count / limit) : 0,
      results: resultData.rows,
    });
  } catch (error) {
    next(error);
  }
};
