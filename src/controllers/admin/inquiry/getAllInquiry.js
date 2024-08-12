import { Op, Sequelize, col } from "sequelize";
import * as model from "../../../models/index.js";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";

/**
 * getAllInquiry
 * @param req
 * @param res
 */

export const getAllInquiry = async (req, res, next) => {
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
      raw: true,
    };
    const searchParamsInput = reqBody.search_params ? reqBody.search_params : {};

    const conditions = {
      status: "active",
      parent_id: 0,
    };

    if (searchParamsInput && searchParamsInput.inquiry_title) {
      conditions.inquiry_title = {
        [Op.like]: `%${searchParamsInput.inquiry_title}%`,
      };
    }

    if (searchParamsInput && searchParamsInput.inquiry_category_id) {
      conditions.inquiry_category_id = searchParamsInput.inquiry_category_id;
    }

    if (searchParamsInput && searchParamsInput.inquirer_email) {
      conditions.user_email = searchParamsInput.inquirer_email;
    }

    if (searchParamsInput && searchParamsInput.status) {
      conditions.inquiry_status = searchParamsInput.status;
    }

    if (
      searchParamsInput &&
      searchParamsInput.inquiry_start_date &&
      !searchParamsInput.inquiry_end_date
    ) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("inquiry.created_at")),
        {
          [Op.gte]: searchParamsInput.inquiry_start_date,
        },
      );
    } else if (
      searchParamsInput &&
      !searchParamsInput.inquiry_start_date &&
      searchParamsInput.inquiry_end_date
    ) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("inquiry.created_at")),
        {
          [Op.lte]: searchParamsInput.inquiry_end_date,
        },
      );
    } else if (
      searchParamsInput &&
      searchParamsInput.inquiry_start_date &&
      searchParamsInput.inquiry_end_date
    ) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("inquiry.created_at")),
        {
          [Op.between]: [searchParamsInput.inquiry_start_date, searchParamsInput.inquiry_end_date],
        },
      );
    }

    if (searchParamsInput && searchParamsInput.ans_start_date && !searchParamsInput.ans_end_date) {
      conditions[Op.and] = Sequelize.where(Sequelize.fn("DATE", Sequelize.col("replied_at")), {
        [Op.gte]: searchParamsInput.ans_start_date,
      });
    } else if (
      searchParamsInput &&
      !searchParamsInput.ans_start_date &&
      searchParamsInput.ans_end_date
    ) {
      conditions[Op.and] = Sequelize.where(Sequelize.fn("DATE", Sequelize.col("replied_at")), {
        [Op.lte]: searchParamsInput.ans_end_date,
      });
    } else if (
      searchParamsInput &&
      searchParamsInput.ans_start_date &&
      searchParamsInput.ans_end_date
    ) {
      conditions[Op.and] = Sequelize.where(Sequelize.fn("DATE", Sequelize.col("replied_at")), {
        [Op.between]: [searchParamsInput.ans_start_date, searchParamsInput.ans_end_date],
      });
    }

    const subConditions = {
      status: { [Op.ne]: "deleted" },
    };
    let isRequired = false;
    if (searchParamsInput && searchParamsInput.inquirer_id) {
      subConditions.user_name = searchParamsInput.inquirer_id;
      isRequired = true;
    }

    const includeArray = [
      {
        model: model.db.inquiryCategory,
        attributes: [],
        required: true,
        where: {
          status: { [Op.ne]: "deleted" },
        },
      },
      {
        model: model.db.user,
        as: "inquirer",
        attributes: [],
        required: isRequired,
        where: subConditions,
      },
    ];

    const attributes = [
      "id",
      col("category_name"),
      "inquiry_title",
      col("user_name"),
      "user_email",
      [Sequelize.literal("DATE_FORMAT(inquiry.created_at, '%Y-%m-%d %H:%i:%s')"), "created_at"],
      "inquiry_status",
      [Sequelize.literal("DATE_FORMAT(inquiry.replied_at, '%Y-%m-%d %H:%i:%s')"), "replied_at"],
    ];

    const getInquiryList = await paginationService.pagination(
      searchParams,
      model.db.inquiry,
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
