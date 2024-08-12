import * as model from "../../../models/index.js";
import { Sequelize, Op, col } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import { customDateTimeHelper } from "../../../helpers/index.js";

/**
 * Get all members
 * @param req
 * @param res
 * @param next
 */

export const memberList = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defautlPageNo = 1;
    const page = reqBody.page ? reqBody.page : defautlPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const searchFilter = reqBody.search_params ? reqBody.search_params : {};
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "id";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "desc";
    const searchByGender = searchFilter && searchFilter.gender ? searchFilter.gender : null;
    const minAge = searchFilter && searchFilter.min_age ? parseInt(searchFilter.min_age) : null;
    const maxAge = searchFilter && searchFilter.max_age ? parseInt(searchFilter.max_age) : null;
    const searchParams = { page, limit, sortBy, sortOrder };
    const currentDate = reqBody.date
      ? reqBody.date
      : await customDateTimeHelper.getCurrentDateTime("YYYY-MM-DD");

    let conditions = {
      status: "active",
    };
    if (minAge && maxAge) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("calculateAge", col("dob"), `${currentDate}`),
        {
          [Op.between]: [minAge, maxAge],
        },
      );
    } else if (minAge && maxAge == null) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("calculateAge", col("dob"), `${currentDate}`),
        {
          [Op.gte]: minAge,
        },
      );
    } else if (minAge == null && maxAge) {
      conditions[Op.and] = Sequelize.where(
        Sequelize.fn("calculateAge", col("dob"), `${currentDate}`),
        {
          [Op.lte]: maxAge,
        },
      );
    }
    if (searchByGender) {
      conditions.gender = searchByGender;
    }
    if (searchFilter && searchFilter.regions && searchFilter.regions.length > 0) {
      let opOr = [];
      for (const eachReg of searchFilter.regions) {
        if (eachReg) {
          opOr.push({ address: { [Op.like]: `%${eachReg}%` } });
        }
      }
      conditions[Op.or] = opOr;
    }

    let subConditions = {
      status: "active",
    };
    let isRequired = false;
    if (searchFilter && searchFilter.marital_status) {
      subConditions.marital_status = searchFilter.marital_status;
      isRequired = true;
    }

    if (searchFilter && searchFilter.jobs && searchFilter.jobs.length > 0) {
      subConditions.job = {
        [Op.in]: searchFilter.jobs,
      };
      isRequired = true;
    }
    if (searchFilter && searchFilter.degrees && searchFilter.degrees.length > 0) {
      subConditions.last_degree = {
        [Op.in]: searchFilter.degrees,
      };
      isRequired = true;
    }

    const includeArray = [
      {
        model: model.db.userAdditionalInfo,
        attributes: [],
        where: subConditions,
        required: isRequired,
      },
    ];
    const selectAttributes = [
      ["id", "ucode"],
      "name",
      "user_name",
      "email",
      ["mobile", "phone_no"],
      "gender",
      "dob",
      [Sequelize.literal("DATE_FORMAT(user.created_at, '%Y-%m-%d %H:%i:%s')"), "created_at"],
    ];

    const getMemberPageList = await paginationService.pagination(
      searchParams,
      model.db.user,
      includeArray,
      conditions,
      selectAttributes,
    );

    return res.ok({
      page: page,
      limit: limit,
      total_records: getMemberPageList.count,
      total_pages: getMemberPageList.count > 0 ? Math.ceil(getMemberPageList.count / limit) : 0,
      results: getMemberPageList.rows,
    });
  } catch (error) {
    next(error);
  }
};
