import * as model from "../../../models/index.js";

/**
 * region List
 * @param req
 * @param res
 */
export const regionList = async (req, res, next) => {
  try {
    const regions = await model.db.regions.findAll({
      attributes: [["id", "region_id"], "region_name"],
      where: { status: "active" },
      order: [["id", "ASC"]],
    });

    res.ok({
      results: regions,
    });
  } catch (error) {
    next(error);
  }
};
