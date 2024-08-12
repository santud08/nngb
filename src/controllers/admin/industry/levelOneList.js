import { Op, Sequelize } from "sequelize";
import * as model from "../../../models/index.js";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";

/**
 * industry list
 * @param req
 * @param res
 * @param next
 */
export const getLevelOneIndustryList = async (req, res, next) => {
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
    const includes = [];
    const conditions = {
      status: "active",
      industry_step: "level_1",
    };
    if (searchParamsInput && searchParamsInput.industry_name) {
      conditions.industry_name = { [Op.like]: `%${searchParamsInput.industry_name}%` };
    }

    if (searchParamsInput && searchParamsInput.start_date && !searchParamsInput.end_date) {
      conditions[Op.and] = Sequelize.where(Sequelize.fn("DATE", Sequelize.col("created_at")), {
        [Op.gte]: searchParamsInput.start_date,
      });
    } else if (searchParamsInput && !searchParamsInput.start_date && searchParamsInput.end_date) {
      conditions[Op.and] = Sequelize.where(Sequelize.fn("DATE", Sequelize.col("created_at")), {
        [Op.lte]: searchParamsInput.end_date,
      });
    } else if (searchParamsInput && searchParamsInput.start_date && searchParamsInput.end_date) {
      conditions[Op.and] = Sequelize.where(Sequelize.fn("DATE", Sequelize.col("created_at")), {
        [Op.between]: [searchParamsInput.start_date, searchParamsInput.end_date],
      });
    }

    const selectAttributes = [
      "id",
      "industry_name",
      "industry_step",
      [
        Sequelize.fn("DATE_FORMAT", Sequelize.col("industry.created_at"), "%Y-%m-%d %H:%i:%s"),
        "registration_date",
      ],
    ];

    //Rows with pagination
    const resultData = await paginationService.pagination(
      searchParams,
      model.db.industry,
      includes,
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
