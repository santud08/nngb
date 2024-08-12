import { Op, Sequelize } from "sequelize";
import * as model from "../../../models/index.js";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";

/**
 * Survey list
 * @param req
 * @param res
 * @param next
 */
export const getSurveyList = async (req, res, next) => {
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
    if (
      searchParamsInput &&
      searchParamsInput.survey_methods &&
      searchParamsInput.survey_methods != ""
    ) {
      conditions.survey_methods = { [Op.like]: `%${searchParamsInput.survey_methods}%` };
    }

    if (searchParamsInput && searchParamsInput.inquirer_name) {
      conditions.name = { [Op.like]: `%${searchParamsInput.inquirer_name}%` };
    }

    if (
      searchParamsInput &&
      searchParamsInput.investigation_start_date &&
      !searchParamsInput.investigation_end_date
    ) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("investigation_start_date")),
        {
          [Op.gte]: searchParamsInput.investigation_start_date,
        },
      );
    } else if (
      searchParamsInput &&
      !searchParamsInput.investigation_start_date &&
      searchParamsInput.investigation_end_date
    ) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("investigation_end_date")),
        {
          [Op.lte]: searchParamsInput.investigation_end_date,
        },
      );
    } else if (
      searchParamsInput &&
      searchParamsInput.investigation_start_date &&
      searchParamsInput.investigation_end_date
    ) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("investigation_start_date")),
        {
          [Op.between]: [
            searchParamsInput.investigation_start_date,
            searchParamsInput.investigation_end_date,
          ],
        },
      );
    }

    const selectAttributes = [
      "id",
      [Sequelize.literal("survey_methods"), "investigation_method"],
      [Sequelize.literal("survey_content"), "inquiry_content"],
      [Sequelize.literal("name"), "inquirer_name"],
      [Sequelize.literal("phone"), "contact"],
      "email",
      [
        Sequelize.fn(
          "DATE_FORMAT",
          Sequelize.col("surveyRequest.investigation_start_date"),
          "%Y-%m-%d %H:%i:%s",
        ),
        "investigation_start_date",
      ],
      [
        Sequelize.fn(
          "DATE_FORMAT",
          Sequelize.col("surveyRequest.investigation_end_date"),
          "%Y-%m-%d %H:%i:%s",
        ),
        "investigation_end_date",
      ],
    ];

    //Rows with pagination
    const resultData = await paginationService.pagination(
      searchParams,
      model.db.surveyRequest,
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
