import * as model from "../../../models/index.js";
import { Sequelize, Op, col } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";

/**
 * getAllInquiry
 * @param req
 * @param res
 */

export const getAllCustomer = async (req, res, next) => {
  try {
    const reqBody = req.body;
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
    const searchParamsInput = reqBody.search_params ? reqBody.search_params : {};

    const conditions = {
      status: { [Op.ne]: "deleted" },
    };

    if (searchParamsInput && searchParamsInput.company_name) {
      conditions.company_customer_name = {
        [Op.like]: `%${searchParamsInput.company_name}%`,
      };
    }

    if (
      searchParamsInput &&
      searchParamsInput.vendor_type &&
      searchParamsInput.vendor_type.length > 0
    ) {
      let opOr = [];
      for (const eachRec of searchParamsInput.vendor_type) {
        if (eachRec) {
          opOr.push({ vendor_type: { [Op.like]: `%${eachRec}%` } });
        }
      }
      conditions[Op.or] = opOr;
    }

    if (searchParamsInput && searchParamsInput.vendor_id) {
      conditions.uuid = searchParamsInput.vendor_id;
    }

    const includeArray = [
      {
        model: model.db.adminUsers,
        as: "affilateUser",
        required: false,
        left: true,
        attributes: [],
        where: { status: { [Op.ne]: "deleted" } },
      },
    ];

    const attributes = [
      "id",
      ["uuid", "vendor_id"],
      ["company_customer_name", "company_name"],
      [col("affilateUser.user_name"), "affilate_id"],
      "vendor_type",
      ["created_at", "registration_date"],
      [
        Sequelize.literal(
          `CASE
          WHEN (vendor_type = 'affiliate' AND affilateUser.id IS NOT NULL) THEN 'y'
          WHEN (vendor_type = 'affiliate' AND affilateUser.id IS NULL) THEN 'n'
          ELSE "" END`,
        ),
        "is_account_created",
      ],
    ];

    const getInquiryList = await paginationService.pagination(
      searchParams,
      model.db.customer,
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
