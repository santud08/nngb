// import * as model from "../../../models/index.js";
import { col } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import { StatusError } from "../../../config/index.js";
import * as model from "../../../models/index.js";
/**
 * affliate user list
 * @param req
 * @param res
 * @param next
 */

export const userListForSpecificVendor = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const vendorId = reqBody.vendor_id ? reqBody.vendor_id : null;
    if (!vendorId) throw StatusError.badRequest(res.__("Vendor id is required"));
    const defautlPageNo = 1;
    const page = reqBody.page ? reqBody.page : defautlPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "id";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "desc";
    const searchParams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
      queryLog: true,
    };
    const conditions = {
      status: "active",
      vendor_id: vendorId,
    };
    const groupByQuery = ["ucode"];

    const includeArray = [
      {
        model: model.db.user,
        where: { status: "active" },
        attributes: [],
      },
      {
        model: model.db.customer,
        where: { status: "active", id: vendorId },
        attributes: ["company_customer_name"],
      },
    ];
    const selectAttributes = [
      [col("user.name"), "name"],
      [col("user.email"), "email"],
      [col("user.mobile"), "phone_number"],
      [col("customer.company_customer_name"), "company_name"],
      [col("user.status"), "weather_or_not_to_use"],
    ];

    const getUserList = await paginationService.paginationWithGroupBy(
      searchParams,
      model.db.ncashExchange,
      includeArray,
      conditions,
      selectAttributes,
      groupByQuery,
    );

    const distinctUcodes = getUserList.count.map((item) => item.ucode);
    const totalRecords = distinctUcodes.length;

    const userList = getUserList.rows.map((user) => ({
      name: user.dataValues.name ? user.dataValues.name : null,
      email: user.dataValues.email ? user.dataValues.email : null,
      phone_number: user.dataValues.phone_number ? user.dataValues.phone_number : null,
      mobile_number: null,
      company_name: user.dataValues.company_name ? user.dataValues.company_name : null,
      weather_or_not_to_use: user.dataValues.weather_or_not_to_use
        ? user.dataValues.weather_or_not_to_use
        : null,
    }));
    return res.ok({
      page: page,
      limit: limit,
      total_records: totalRecords,
      total_pages: totalRecords > 0 ? Math.ceil(totalRecords / limit) : 0,
      results: userList,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
