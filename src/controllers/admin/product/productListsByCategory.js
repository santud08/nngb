import { Sequelize, Op, col } from "sequelize";
import * as model from "../../../models/index.js";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import { StatusError } from "../../../config/index.js";

/**
 * product list by category
 * @param req
 * @param res
 * @param next
 */
export const productListsByCategory = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defautlPageNo = 1;
    const categoryId = reqBody.category_id ? reqBody.category_id : null;
    if (!categoryId) throw StatusError.badRequest(res.__("Category Id is required"));

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

    let conditions = { status: { [Op.ne]: "deleted" }, category_id: categoryId };

    if (searchParamsInput && searchParamsInput.category_name) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("eTicketCodeCategory.category_name")),
        {
          [Op.like]: `%${searchParamsInput.category_name.toLowerCase()}%`,
        },
      );
    }

    if (searchParamsInput && searchParamsInput.product_name) {
      conditions.ticket_name = {
        [Op.like]: `%${searchParamsInput.product_name}%`,
      };
    }

    if (searchParamsInput && searchParamsInput.status) {
      conditions.status = searchParamsInput.status;
    }

    if (searchParamsInput && searchParamsInput.reg_start_date && !searchParamsInput.reg_end_date) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("eTicketCode.created_at")),
        {
          [Op.gte]: searchParamsInput.reg_start_date,
        },
      );
    } else if (
      searchParamsInput &&
      !searchParamsInput.reg_start_date &&
      searchParamsInput.reg_end_date
    ) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("eTicketCode.created_at")),
        {
          [Op.lte]: searchParamsInput.reg_end_date,
        },
      );
    } else if (
      searchParamsInput &&
      searchParamsInput.reg_start_date &&
      searchParamsInput.reg_end_date
    ) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("eTicketCode.created_at")),
        {
          [Op.between]: [searchParamsInput.reg_start_date, searchParamsInput.reg_end_date],
        },
      );
    }

    let selectAttributes = [
      ["id", "product_id"],
      ["ticket_code", "product_code"],
      ["status", "weather_or_not_to_use"],
      [col("eTicketCodeCategory.category_name"), "category_name"],
      ["ticket_name", "product_name"],
      "price",
      "exp_start_date",
      "exp_end_date",
      ["created_at", "reg_date"],
    ];

    const includeArray = [
      {
        model: model.db.eTicketCodeCategory,
        where: { status: "active" },
        attributes: [],
      },
    ];

    const resultData = await paginationService.pagination(
      searchParams,
      model.db.eTicketCode,
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
    console.log(error);
    next(error);
  }
};
