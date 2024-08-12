import * as model from "../../../models/index.js";

/**
 * Headquarter List
 * @param req
 * @param res
 */
export const headquarterList = async (req, res, next) => {
  try {
    const headquarters = await model.db.headquarter.findAll({
      attributes: [["id", "hq_id"], "hq_name"],
      where: { status: "active" },
      order: [["id", "ASC"]],
    });

    res.ok({
      results: headquarters,
    });
  } catch (error) {
    next(error);
  }
};
