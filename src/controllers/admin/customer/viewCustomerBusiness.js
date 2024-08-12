import { StatusError } from "../../../config/StatusErrors.js";
import * as model from "../../../models/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import { paginationService } from "../../../services/index.js";

/**
 * viewInquiry
 * @param req
 * @param res
 */
export const viewCustomerBusiness = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const customerId = reqBody.customer_id ? reqBody.customer_id : null;
    if (!customerId) throw StatusError.badRequest(res.__("invalidId"));

    const defautlPageNo = 1;
    const page = reqBody.page ? reqBody.page : defautlPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "id";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "DESC";
    const searchParams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };

    const conditions = {
      status: "active",
      vendor_id: customerId,
    };

    const includeArray = [];

    const attributes = [
      "id",
      ["service_start_date", "start_date"],
      ["service_end_date", "end_date"],
      ["uuid", "business_id"],
      "btype",
      ["business_name", "title"],
      "is_confirm",
    ];

    const getInquiryList = await paginationService.pagination(
      searchParams,
      model.db.business,
      includeArray,
      conditions,
      attributes,
    );

    return res.ok({
      page: page,
      limit: limit,
      total_records: getInquiryList.count,
      total_pages: getInquiryList.count > 0 ? Math.ceil(getInquiryList.count / limit) : 0,
      results: getInquiryList.rows,
    });
  } catch (error) {
    next(error);
  }
};
