import * as models from "../../../models/index.js";

/**
 * applianceList
 * @param req
 * @param res
 */
export const applianceList = async (req, res, next) => {
  try {
    const results = await models.db.homeAppliances.findAll({
      attributes: ["id", "appliance_name"],
      where: { status: "active" },
    });
    res.ok({
      results,
    });
  } catch (error) {
    next(error);
  }
};
