import Sequelize from "sequelize";
import { sequelize } from "../../../config/database.js";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import * as model from "../../../models/index.js";

const { eTicketCode, eTicketCodeCategory } = model.db;

/**
 * E ticket code list
 * @param req
 * @param res
 * @param next
 */
export const getCoupons = async (req, res, next) => {
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
    const searchParamsInput = reqBody.search_params ? reqBody.search_params : "";

    let includeSubConditions = { status: "active" };
    const includeQuery = [
      {
        model: eTicketCodeCategory,
        attributes: ["id", "category_name"],
        where: includeSubConditions,
        required: false,
      },
    ];

    let includeConditions = { status: "active" };
    if (searchParamsInput && searchParamsInput.category_id) {
      includeConditions.category_id = {
        [Sequelize.Op.eq]: `${searchParamsInput.category_id}`,
      };
    }

    const selectAttributes = [
      "id",
      "ticket_code",
      "ticket_name",
      "price",
      "img_url",
      [
        sequelize.fn("DATE_FORMAT", sequelize.col("eTicketCode.created_at"), "%Y-%m-%d"),
        "created_at",
      ],
    ];

    //Rows with pagination
    const getList = await paginationService.pagination(
      searchParams,
      eTicketCode,
      includeQuery,
      includeConditions,
      selectAttributes,
    );

    return res.ok({
      page: page,
      limit: limit,
      total_records: getList.count,
      total_pages: getList.count > 0 ? Math.ceil(getList.count / limit) : 0,
      results: getList,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};
