import * as model from "../../../models/index.js";
import { Sequelize } from "sequelize";
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

    const sortBy = reqBody.sort_by ? reqBody.sort_by : "created_at";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "desc";
    const panel = reqBody.panel ? reqBody.panel : null;
    const searchParams = { page, limit, sortBy, sortOrder };
    const userId = !req.userDetails || !req.userDetails.userId ? null : req.userDetails.userId;

    const conditions = {
      status: "active",
      created_by: userId,
      parent_id: 0,
    };
    if (panel) conditions.panel = panel;
    const includeArray = [
      {
        model: model.db.inquiryCategory,
        attributes: ["category_name"],
        required: true,
      },
      {
        model: model.db.inquiry,
        as: "replyQuestion",
        attributes: [
          "id",
          "inquiry_description",
          [Sequelize.literal("CONCAT('', inquiry.inquiry_answer)"), "inquiry_answer"],
        ],
        order: [["id", "asc"]],
        separate: true,
      },
    ];
    const attributes = [
      "id",
      "inquiry_title",
      "inquiry_description",
      [Sequelize.literal("CONCAT('', inquiry.inquiry_answer)"), "inquiry_answer"],
      [Sequelize.literal("DATE_FORMAT(inquiry.replied_at, '%Y-%m-%d %H:%i:%s')"), "replied_at"],
      "inquiry_status",
      "panel",
      [Sequelize.literal("DATE_FORMAT(inquiry.created_at, '%Y-%m-%d %H:%i:%s')"), "created_at"],
    ];

    const getInquiryList = await paginationService.pagination(
      searchParams,
      model.db.inquiry,
      includeArray,
      conditions,
      attributes,
    );

    if (getInquiryList.count > 0) {
      for (const [i, eachRow] of Object.entries(getInquiryList.rows)) {
        if (eachRow) {
          getInquiryList.rows[i]["dataValues"]["category_name"] =
            eachRow.inquiryCategory && eachRow.inquiryCategory.dataValues.category_name
              ? eachRow.inquiryCategory.dataValues.category_name
              : "";

          getInquiryList.rows[i]["dataValues"]["reply_questions"] =
            getInquiryList.rows[i]["dataValues"]["reply_questions"] || [];
          getInquiryList.rows[i]["dataValues"]["reply_questions"] =
            eachRow.replyQuestion && eachRow.replyQuestion ? eachRow.replyQuestion : [];

          delete getInquiryList.rows[i]["inquiryCategory"]["dataValues"];
          delete getInquiryList.rows[i]["dataValues"]["replyQuestion"];
        }
      }
    }

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
