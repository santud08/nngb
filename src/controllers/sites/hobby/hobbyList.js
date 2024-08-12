import * as models from "../../../models/index.js";

/**
 * hobbyList
 * @param req
 * @param res
 */
export const hobbyList = async (req, res, next) => {
  try {
    const results = await models.db.hobbyList.findAll({
      attributes: ["id", "hobby_name"],
      where: { status: "active" },
    });
    res.ok({
      results,
    });
  } catch (error) {
    next(error);
  }
};
