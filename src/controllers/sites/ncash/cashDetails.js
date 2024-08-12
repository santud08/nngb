import { Sequelize, Op } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import * as model from "../../../models/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";

/**
 * Cash Details
 * @param req
 * @param res
 * @param next
 */
export const cashDetails = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = !req.userDetails.userId ? null : req.userDetails.userId;
    const defautlPageNo = 1;
    const page = reqBody.page ? reqBody.page : defautlPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const isFirst = reqBody.is_first ? reqBody.is_first : "y";
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "reg_day";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "desc";
    const searchParamsInput = reqBody.search_params ? reqBody.search_params : "";
    let currentYearMonth = 0,
      currentYear = 0;
    let resultData = {};

    //Setting Year List
    if (searchParamsInput && searchParamsInput.date) {
      [currentYearMonth, currentYear] = await Promise.all([
        customDateTimeHelper.changeDateFormat(searchParamsInput.date, "YYYY-MM"),
        customDateTimeHelper.changeDateFormat(searchParamsInput.date, "YYYY"),
      ]);
    } else {
      [currentYearMonth, currentYear] = await Promise.all([
        customDateTimeHelper.getCurrentDateTime("YYYY-MM"),
        customDateTimeHelper.getCurrentDateTime("YYYY"),
      ]);
    }

    const searchParams = {
      page: page,
      limit: limit,
      sortBy: sortBy == "reg_date" ? "reg_day" : sortBy,
      sortOrder: sortOrder,
      queryLog: true,
    };
    //const searchParamsInput = reqBody.search_params ? reqBody.search_params : "";

    let conditions = { blind_yn: "N", ucode: userId, status: "active" };
    if (searchParamsInput && searchParamsInput.year) {
      conditions[Sequelize.col("DATE_FORMAT(reg_day,'%Y')")] = Sequelize.where(
        Sequelize.fn("DATE_FORMAT", Sequelize.col("reg_day"), "%Y"),
        searchParamsInput.year,
      );
    } else {
      conditions[Sequelize.col("DATE_FORMAT(reg_day,'%Y-%m')")] = Sequelize.where(
        Sequelize.fn("DATE_FORMAT", Sequelize.col("reg_day"), "%Y-%m"),
        currentYearMonth,
      );
    }
    if (searchParamsInput && searchParamsInput.search_title) {
      conditions.title = {
        [Op.like]: `%${searchParamsInput.search_title}%`,
      };
    }
    const selectAttributes = [
      ["id", "history_cash_id"],
      "title",
      "cash",
      [Sequelize.literal("DATE_FORMAT(cahsHistory.reg_day, '%Y-%m-%d %H:%i:%s')"), "reg_date"],
    ];

    //Rows with pagination
    const data = await paginationService.pagination(
      searchParams,
      model.db.cashHistory,
      [],
      conditions,
      selectAttributes,
    );

    if (isFirst == "y") {
      currentYear = Number(currentYear);
      const lastYear = currentYear - 1;
      const yearList = [
        {
          year: "",
          display_text: res.__("current_month"),
        },
        {
          year: currentYear,
          display_text: `${currentYear}`,
        },
        {
          year: lastYear,
          year_text: `${lastYear}`,
        },
      ];
      const totalCash = await model.db.cashHistory.findOne({
        where: { blind_yn: "N", ucode: userId, status: "active" },
        order: [["reg_day", "DESC"]],
        attributes: [Sequelize.fn("SUM", "total_cash"), "total_cash"],
      });

      resultData.year_list = yearList;
      resultData.holding_cash = totalCash && totalCash.total_cash ? totalCash.total_cash : 0;
      resultData.withdrawable_cash = totalCash && totalCash.total_cash ? totalCash.total_cash : 0;
      resultData = {
        ...resultData,
        page: page,
        limit: limit,
        total_records: data.count,
        total_pages: data.count > 0 ? Math.ceil(data.count / limit) : 0,
        results: data.rows,
      };
    } else {
      resultData = {
        page: page,
        limit: limit,
        total_records: data.count,
        total_pages: data.count > 0 ? Math.ceil(data.count / limit) : 0,
        results: data.rows,
      };
    }
    return res.ok(resultData);
  } catch (error) {
    next(error);
  }
};
