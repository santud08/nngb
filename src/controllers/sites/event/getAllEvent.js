import * as model from "../../../models/index.js";
const { event } = model.db;
import { StatusError } from "../../../config/index.js";
import { Sequelize, Op } from "sequelize";
import { sequelize } from "../../../config/database.js";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";

/**
 * Get all events
 * @param req
 * @param res
 */
export const getAllEvent = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defaultPageNo = 1;
    const page = reqBody.page ? reqBody.page : defaultPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;

    const sortBy = reqBody.sortBy ? reqBody.sortBy : "created_at";
    const sortOrder = reqBody.sortOrder ? reqBody.sortOrder : "desc";
    const panel = reqBody.panel;
    const searchParams = { page, limit, sortBy, sortOrder };
    const userID = req.userDetails.userId;

    let conditions = {
      status: { [Sequelize.Op.ne]: "deleted" },
      panel: panel,
    };

    const getEventPageList = await paginationService.pagination(
      searchParams,
      event,
      [],
      conditions,
      [
        "id",
        [sequelize.literal("DATE_FORMAT(event.created_at, '%Y-%m-%d %H:%i:%s')"), "created_at"],
        "event_code",
        "event_name",
         [sequelize.literal("DATE_FORMAT(event.event_start_date, '%Y-%m-%d %H:%i:%s')"), "event_start_date"],
        [sequelize.literal("DATE_FORMAT(event.event_end_date, '%Y-%m-%d %H:%i:%s')"), "event_end_date"],
        "event_image_url",
        "event_description",
        "panel",
        "points",
        "event_method",
      ],
    );

    return res.ok({
      page: page,
      limit: limit,
      total_records: getEventPageList.count,
      total_pages: getEventPageList.count > 0 ? Math.ceil(getEventPageList.count / limit) : 0,
      results: getEventPageList,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};