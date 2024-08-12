import { sequelize } from "../../../config/database.js";
import Sequelize from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import * as model from "../../../models/index.js";

const { announcement, announcementCategory } = model.db;

/**
 * Announcement list
 * @param req
 * @param res
 * @param next
 */
export const getAnnouncements = async (req, res, next) => {
  try {
    const reqBody = req.body;
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
    let includeSubConditions = { status: "active" };
    if (searchParamsInput && searchParamsInput.panel) {
      includeConditions.panel = {
        [Sequelize.Op.eq]: `${searchParamsInput.panel}`,
      };

      includeSubConditions.panel = {
        [Sequelize.Op.eq]: `${searchParamsInput.panel}`,
      };
    }

    const includeQuery = [
      {
        model: announcementCategory,
        attributes: ["id", "category_name"],
        where: includeSubConditions,
        required: false,
      },
    ];

    const selectAttributes = [
      "id",
      "announcement_title",
      "announcement_description",
      [
        sequelize.fn("DATE_FORMAT", sequelize.col("announcement.created_at"), "%Y.%m.%d"),
        "registration_date",
      ],
    ];

    //Rows with pagination
    const data = await paginationService.pagination(
      searchParams,
      announcement,
      includeQuery,
      includeConditions,
      selectAttributes,
    );

    return res.ok({
      results: data,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};
