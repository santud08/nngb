import * as models from "../../../models/index.js";

/**
 * sportsList
 * @param req
 * @param res
 */
export const sportsList = async (req, res, next) => {
  try {
    const results = await models.db.sportsList.findAll({
      attributes: ["id", "sport_name"],
      where: { status: "active" },
    });
    res.ok({
      results,
    });
  } catch (error) {
    next(error);
  }
};
