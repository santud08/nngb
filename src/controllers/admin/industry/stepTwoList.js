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
export const getStepTwoIndustryList = async (req, res, next) => {
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
      queryLog: true,
    };
    const searchParamsInput = reqBody.search_params ? reqBody.search_params : {};
    const includes = [
      {
        model: model.db.industry,
        as: "ParentData",
        attributes: ["id", "industry_name"],
        order: [["id", "DESC"]],
        where: { status: { [Op.ne]: "deleted" } },
      },
    ];
    const conditions = {
      status: "active",
      industry_step: "step_2",
      parent: { [Op.ne]: 0 },
    };
    if (searchParamsInput && searchParamsInput.industry_name) {
      conditions.industry_name = { [Op.like]: `%${searchParamsInput.industry_name}%` };
    }

    if (searchParamsInput && searchParamsInput.start_date && !searchParamsInput.end_date) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("industry.created_at")),
        {
          [Op.gte]: searchParamsInput.start_date,
        },
      );
    } else if (searchParamsInput && !searchParamsInput.start_date && searchParamsInput.end_date) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("industry.created_at")),
        {
          [Op.lte]: searchParamsInput.end_date,
        },
      );
    } else if (searchParamsInput && searchParamsInput.start_date && searchParamsInput.end_date) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("industry.created_at")),
        {
          [Op.between]: [searchParamsInput.start_date, searchParamsInput.end_date],
        },
      );
    }

    const selectAttributes = [
      "id",
      ["parent", "parent_id"],
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
    //console.log(resultData);

    // resultData.forEach((item) => {
    //   let parent = item.parent;
    //   console.log(parent);
    // });
    //console.log(resultData);
    // const result = await Promise.all(
    //   resultData.rows.map(async (item) => {
    //     // console.log("-----------");

    //     // console.log(item);
    //     // console.log("-----------");
    //     // // console.log(item.id);
    //     console.log(item.parent_id);
    //     const parentName = await model.db.industry({
    //       attributes: ["industry_name"],
    //       where: {
    //         status: "active",
    //         id: item.dataValues.parent_id,
    //       },
    //     });

    //     return {
    //       id: item.dataValues.id,
    //       parent_id: item.dataValues.parent_id,
    //       industry_name: item.dataValues.industry_name,
    //       parent_name: parentName,
    //       industry_step: item.dataValues.industry_step,
    //     };
    //   }),
    // );
    //console.log(result);
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
