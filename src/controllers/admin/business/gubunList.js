import * as model from "../../../models/index.js";

/**
 * gubun List
 * @param req
 * @param res
 */
export const gubunList = async (req, res, next) => {
  try {
    const gubunList = await model.db.gubun.findAll({
      attributes: [["id", "gubun_id"], "gubun_name"],
      where: { status: "active" },
      order: [["id", "ASC"]],
    });

    res.ok({
      results: gubunList,
    });
  } catch (error) {
    next(error);
  }
};
