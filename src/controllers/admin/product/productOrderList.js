import * as model from "../../../models/index.js";
import { Sequelize, Op, col } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import { StatusError } from "../../../config/index.js";

/**
 * Get all product order list
 * @param req
 * @param res
 * @param next
 */

export const productOrderList = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const productId = reqBody.product_id ? reqBody.product_id : null;
    if (!productId) throw StatusError.badRequest(res.__("Product id is required"));
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
      queryLog: true,
    };
    const searchParamsInput = reqBody.search_params ? reqBody.search_params : {};

    const conditions = {
      status: "active",
      ticket_id: productId,
    };

    if (searchParamsInput && searchParamsInput.ucode) {
      conditions.ucode = searchParamsInput.ucode;
    }

    if (searchParamsInput && searchParamsInput.name) {
      conditions[Op.and] = Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("user.name")), {
        [Op.like]: `%${searchParamsInput.name.toLowerCase()}%`,
      });
    }

    if (searchParamsInput && searchParamsInput.user_id) {
      conditions[Op.and] = Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("user.user_name")), {
        [Op.like]: `%${searchParamsInput.user_id.toLowerCase()}%`,
      });
    }

    if (
      searchParamsInput &&
      searchParamsInput.current_status &&
      Array.isArray(searchParamsInput.current_status) &&
      searchParamsInput.current_status.length > 0
    ) {
      conditions.request_status = {
        [Op.in]: searchParamsInput.current_status,
      };
    }

    if (searchParamsInput && searchParamsInput.reg_start_date && !searchParamsInput.reg_end_date) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("eTicketOrder.created_at")),
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
        Sequelize.fn("DATE", Sequelize.col("eTicketOrder.created_at")),
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
        Sequelize.fn("DATE", Sequelize.col("eTicketOrder.created_at")),
        {
          [Op.between]: [searchParamsInput.reg_start_date, searchParamsInput.reg_end_date],
        },
      );
    }

    if (
      searchParamsInput &&
      searchParamsInput.approval_start_date &&
      !searchParamsInput.approval_end_date
    ) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("eTicketOrder.confirmedd_at")),
        {
          [Op.gte]: searchParamsInput.approval_start_date,
        },
      );
    } else if (
      searchParamsInput &&
      !searchParamsInput.approval_start_date &&
      searchParamsInput.approval_end_date
    ) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("eTicketOrder.confirmedd_at")),
        {
          [Op.lte]: searchParamsInput.approval_end_date,
        },
      );
    } else if (
      searchParamsInput &&
      searchParamsInput.approval_start_date &&
      searchParamsInput.approval_end_date
    ) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("eTicketOrder.confirmedd_at")),
        {
          [Op.between]: [
            searchParamsInput.approval_start_date,
            searchParamsInput.approval_end_date,
          ],
        },
      );
    }

    const selectAttributes = [
      ["id", "product_id"],
      "ucode",
      [col("user.name"), "name"],
      [col("user.user_name"), "user_id"],
      ["title", "exchange_content"],
      [
        Sequelize.literal("ncash_used + webhard_used+webhard_charge+other_charge"),
        "exchange_ncash",
      ],
      ["confirmed_by", "administrator_id"],
      ["created_at", "request_of_approval_date"],
      ["confirmed_at", "approval_processing_date"],
      ["request_status", "current_status"],
      ["tid", "transaction_id"],
    ];

    const includeArray = [
      {
        model: model.db.user,
        where: { status: "active" },
        attributes: [],
      },
    ];

    const getTicketOrderHistory = await paginationService.pagination(
      searchParams,
      model.db.eTicketOrder,
      includeArray,
      conditions,
      selectAttributes,
    );

    return res.ok({
      page: page,
      limit: limit,
      total_records: getTicketOrderHistory.count,
      total_pages:
        getTicketOrderHistory.count > 0 ? Math.ceil(getTicketOrderHistory.count / limit) : 0,
      results: getTicketOrderHistory.rows,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
