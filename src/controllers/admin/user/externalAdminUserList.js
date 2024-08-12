import * as model from "../../../models/index.js";
import { Op } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";

/**
 * externalAdminUserList
 * get external admin user details
 * @param req
 * @param res
 * @param next
 */
export const externalAdminUserList = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defaultPageNo = 1;
    const page = reqBody.page ? reqBody.page : defaultPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "id";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "desc";
    const searchParams = { page, limit, sortBy, sortOrder }; //, raw: true
    const searchFilter = reqBody.search_params ? reqBody.search_params : {};

    let customerContactPersonsConditions = {
      status: { [Op.ne]: "deleted" },
      person_type: "outside",
    };
    if (searchFilter && searchFilter.customer_ids && searchFilter.customer_ids.length > 0) {
      customerContactPersonsConditions.customer_id = {
        [Op.in]: searchFilter.customer_ids,
      };
    }

    let conditions = {
      status: { [Op.ne]: "deleted" },
    };

    if (searchFilter && searchFilter.code) {
      conditions.hcode = searchFilter.code;
    }

    if (searchFilter && searchFilter.name) {
      conditions.name = {
        [Op.like]: `%${searchFilter.name}%`,
      };
    }

    if (searchFilter && searchFilter.email) {
      conditions.email = searchFilter.email;
    }

    if (searchFilter && searchFilter.contact) {
      conditions.contact_no = searchFilter.contact;
    }

    if (searchFilter && searchFilter.bu_id) {
      conditions.bu_id = searchFilter.bu_id;
    }

    if (searchFilter && searchFilter.headquarter_id) {
      conditions.headquarter_id = searchFilter.headquarter_id;
    }

    if (searchFilter && searchFilter.team_id) {
      conditions.team_id = searchFilter.team_id;
    }

    if (searchFilter && searchFilter.rank) {
      conditions.rank = searchFilter.rank;
    }

    const includeArray = [
      // {
      //   model: model.db.bu,
      //   attributes: ["id", "bu_name"],
      //   where: { status: "active" },
      //   required: false,
      // },
      // {
      //   model: model.db.team,
      //   attributes: ["id", "team_name"],
      //   where: { status: "active" },
      //   required: false,
      // },
      // {
      //   model: model.db.headquarter,
      //   attributes: ["id", "hq_name"],
      //   where: { status: "active" },
      //   required: false,
      // },
      // {
      //   model: model.db.customerContactPersons,
      //   attributes: [],
      //   where: customerContactPersonsConditions,
      // },
    ];

    const getUserPageList = await paginationService.pagination(
      searchParams,
      model.db.contactPersons,
      includeArray,
      conditions,
      [
        "id",
        ["hcode", "code"],
        "name",
        "email",
        ["contact_no", "contact"],
        "rank",
        ["bu_id", "bu_name"],
        ["team_id", "team_name"],
        ["headquarter_id", "headquarter_name"],
      ],
    );

    let resultData = [];
    if (getUserPageList && getUserPageList.rows.length > 0) {
      for (const eachPersonIncharge of getUserPageList.rows) {
        if (eachPersonIncharge) {
          let formatData = eachPersonIncharge.dataValues;
          console.log(eachPersonIncharge.dataValues);
          formatData.bu_name =
            eachPersonIncharge.dataValues && eachPersonIncharge.dataValues.bu_name
              ? eachPersonIncharge.dataValues.bu_name
              : "";
          formatData.headquarter_name =
            eachPersonIncharge.dataValues && eachPersonIncharge.dataValues.team_name
              ? eachPersonIncharge.dataValues.team_name
              : "";
          formatData.team_name =
            eachPersonIncharge.dataValues && eachPersonIncharge.dataValues.team_name
              ? eachPersonIncharge.dataValues.team_name
              : "";

          delete eachPersonIncharge.dataValues.bu;
          delete eachPersonIncharge.dataValues.headquarter;
          delete eachPersonIncharge.dataValues.team;

          resultData.push(formatData);
        }
      }
    }

    return res.ok({
      page: page,
      limit: limit,
      total_records: getUserPageList.count,
      total_pages: getUserPageList.count > 0 ? Math.ceil(getUserPageList.count / limit) : 0,
      results: getUserPageList.rows,
    });
  } catch (error) {
    next(error);
  }
};
