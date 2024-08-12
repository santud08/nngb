import * as models from "../../../models/index.js";
import { Sequelize } from "sequelize";
/**
 * Inquiry Category List
 * @param req
 * @param res
 */
export const getAllIntranet = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const conditions = {}; // Define conditions object

    if (reqBody && reqBody.project_code) {
      // conditions.project_code = reqBody.project_code; // Use the correct field name
      conditions.PJT_TITLE = {
        [Sequelize.Op.like]: `%${reqBody.project_code}%`, // Use the correct field name
      };
    }

    // Replace "status" with the actual field you want to filter on
    const results = await models.db.VTBL_PROJECT.findAll({
      attributes: ["PROJECT_CODE", "PJT_TITLE"],
      where: conditions, // Use the conditions object to filter
    });

    res.ok({
      results,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
