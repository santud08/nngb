import * as model from "../../../models/index.js";
import { Sequelize } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";
import { StatusError } from "../../../config/index.js";

/**
 * recommenderList
 * Get all Reffer
 * @param req
 * @param res
 * @param next
 */
export const recommenderList = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defaultPageNo = 1;
    const page = reqBody.page ? reqBody.page : defaultPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const searchParams = { page, limit, sortOrder: "asc", sortBy: "id" };

    const userId = !req.userDetails.userId ? null : req.userDetails.userId;

    if (!userId) throw StatusError.unauthorized(res.__("unAuthorizedAccess"));

    const user = await model.db.user.findOne({
      where: { status: "active", id: userId },
    });

    const referralId = user && user.referral_id ? user.referral_id : null;
    let getReferrerList = { count: 0, rows: [] };
    if (referralId) {
      const conditions = {
        status: "active",
      };

      const attributes = [
        "id",
        [
          Sequelize.literal(
            "CONCAT(LEFT(user.user_name, 2), REPEAT('*', LENGTH(user.user_name) - 4), RIGHT(user.user_name, 2))",
          ),
          "user_name",
        ],
        [Sequelize.fn("DATE_FORMAT", Sequelize.col("user.created_at"), "%Y-%m-%d"), "created_date"],
      ];
      const includes = [
        {
          model: model.db.userAdditionalInfo,
          attributes: [],
          where: { status: "active", referrer_id: referralId },
          required: true,
        },
      ];
      getReferrerList = await paginationService.pagination(
        searchParams,
        model.db.user,
        includes,
        conditions,
        attributes,
      );
    }
    return res.ok({
      page: page,
      limit: limit,
      total_records: getReferrerList.count,
      total_pages: getReferrerList.count > 0 ? Math.ceil(getReferrerList.count / limit) : 0,
      results: getReferrerList.rows,
    });
  } catch (error) {
    next(error);
  }
};
