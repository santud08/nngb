import { Sequelize, Op } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import * as model from "../../../models/index.js";

/**
 * Subpanel list
 * @param req
 * @param res
 * @param next
 */
export const getSubpanels = async (req, res, next) => {
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
    let conditions = { status: { [Op.ne]: "deleted" } };
    if (searchParamsInput && searchParamsInput.status && searchParamsInput.status != "") {
      conditions.status = searchParamsInput.status;
    }

    if (searchParamsInput && searchParamsInput.subpanel_title) {
      conditions.subpanel_title = { [Op.like]: `%${searchParamsInput.subpanel_title}%` };
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
      "subpanel_title",
      [
        Sequelize.fn("DATE_FORMAT", Sequelize.col("subpanel.created_at"), "%Y-%m-%d %H:%i:%s"),
        "created_at",
      ],
      [Sequelize.literal(`CASE WHEN status = 'active' THEN 'Y' ELSE 'N' END`), "status"],
    ];

    //Rows with pagination
    const resultData = await paginationService.pagination(
      searchParams,
      model.db.subpanel,
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
