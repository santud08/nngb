import Sequelize from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import * as model from "../../../models/index.js";

const { opinion, opinionItem, opinionAnswer } = model.db;

/**
 * Opinion list
 * @param req
 * @param res
 * @param next
 */
export const getOpinions = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userDetails = req.userDetails;
    const userId = userDetails.userId ? userDetails.userId : 0;

    const defautlPageNo = 1;
    const page = reqBody.page ? reqBody.page : defautlPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "";
    const searchParams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };
    const searchParamsInput = reqBody.search_params ? reqBody.search_params : "";

    let includeConditions = { status: "active" };
    includeConditions.start_date = {
      [Sequelize.Op.lte]: Sequelize.literal("CURRENT_TIMESTAMP()"),
    };
    includeConditions.end_date = {
      [Sequelize.Op.gt]: Sequelize.literal("CURRENT_TIMESTAMP()"),
    };
    if (searchParamsInput && searchParamsInput.panel) {
      includeConditions.panel = {
        [Sequelize.Op.eq]: `${searchParamsInput.panel}`,
      };
    }
    if (searchParamsInput && searchParamsInput.opinion_section) {
      includeConditions.opinion_section = {
        [Sequelize.Op.eq]: `${searchParamsInput.opinion_section}`,
      };
    }

    let includeSubConditions1 = { status: "active" };

    let includeSubConditions2 = { status: "active" };
    if (userDetails && userDetails.userId) {
      includeSubConditions2.created_by = {
        [Sequelize.Op.eq]: `${userId}`,
      };
    }

    const includeQuery = [
      {
        model: opinionItem,
        attributes: ["id", "opinion_item_title"],
        where: includeSubConditions1,
        required: false,
      },
      {
        model: opinionAnswer,
        attributes: ["id", "opinion_item_id", "comment", "created_by"],
        where: includeSubConditions2,
        required: false,
      },
    ];

    const selectAttributes = [
      "id",
      "opinion_title",
      "opinion_description",
      "start_date",
      "end_date",
      "point",
      "opinion_type",
      "created_at",
    ];

    //Rows with pagination
    const data = await paginationService.pagination(
      searchParams,
      opinion,
      includeQuery,
      includeConditions,
      selectAttributes,
    );

    return res.ok({
      results: data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
