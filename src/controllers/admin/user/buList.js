import * as model from "../../../models/index.js";

/**
 * BU List
 * @param req
 * @param res
 */
export const buList = async (req, res, next) => {
  try {
    const buLists = await model.db.bu.findAll({
      attributes: [["id", "bu_id"], "bu_name"],
      where: { status: "active" },
      order: [["id", "ASC"]],
    });

    res.ok({
      results: buLists,
    });
  } catch (error) {
    next(error);
  }
};
