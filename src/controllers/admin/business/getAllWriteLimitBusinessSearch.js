import * as model from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * Get all write limit business search
 * @param req
 * @param res
 * @param next
 */

export const getAllWriteLimitBusinessSearch = async (req, res, next) => {
  try {
    const reqQuery = req.query;

    let conditions = {
      status: "active",
    };

    if (reqQuery && reqQuery.business_name_search) {
      conditions.business_name = {
        [Op.like]: `%${reqQuery.business_name_search}%`,
      };
    }

    const getBusinessList = await model.db.business.findAll({
      where: conditions,
      attributes: ["id", ["uuid", "business_code"], ["business_name", "business_title"]],
      order: [["id", "DESC"]],
    });

    return res.ok({
      results: getBusinessList,
    });
  } catch (error) {
    next(error);
  }
};
