import * as model from "../../../models/index.js";
import { Op, col } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";

/**
 * adminUserList
 * get admin user details
 * @param req
 * @param res
 * @param next
 */
export const adminUserList = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defaultPageNo = 1;
    const page = reqBody.page ? reqBody.page : defaultPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "id";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "desc";
    const searchParams = { page, limit, sortBy, sortOrder, raw: true };
    const userID = req.userDetails.userId ? req.userDetails.userId : null;
    const searchFilter = reqBody.search_params ? reqBody.search_params : {};

    let conditions = {
      user_type: { [Op.ne]: "super_admin" },
      id: { [Op.ne]: userID },
      status: { [Op.ne]: "deleted" },
    };
    if (searchFilter && searchFilter.status) {
      conditions.status = searchFilter.status;
    }
    if (searchFilter && searchFilter.email) {
      conditions.email = searchFilter.email;
    }
    if (searchFilter && searchFilter.user_name) {
      conditions.user_name = searchFilter.user_name;
    }
    if (searchFilter && searchFilter.department) {
      conditions.department_id = searchFilter.department;
    }
    if (searchFilter && searchFilter.name) {
      conditions.name = {
        [Op.like]: `%${searchFilter.name}%`,
      };
    }
    if (searchFilter && searchFilter.regions && searchFilter.regions.length > 0) {
      conditions.additional_address = {
        [Op.in]: searchFilter.regions,
      };
    }
    const includeArray = [
      {
        model: model.db.departments,
        attributes: [],
        where: { status: "active" },
        left: true,
        required: false,
      },
    ];

    const getUserPageList = await paginationService.pagination(
      searchParams,
      model.db.adminUsers,
      includeArray,
      conditions,
      [
        "id",
        col("department_name"),
        "name",
        "user_name",
        "email",
        "phone",
        "mobile",
        "status",
        ["reg_day", "registration_date"],
      ],
    );

    return res.ok({
      page: page,
      limit: limit,
      total_records: getUserPageList.count,
      total_pages: getUserPageList.count > 0 ? Math.ceil(getUserPageList.count / limit) : 0,
      results: getUserPageList.rows,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
