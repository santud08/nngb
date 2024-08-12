import * as model from "../../../models/index.js";

/**
 * duplicate method check List
 * @param req
 * @param res
 */
export const duplicateCheckMethodList = async (req, res, next) => {
  try {
    const duplicateCheckMethods = await model.db.duplicateCheckMethod.findAll({
      attributes: [["id", "duplicate_check_id"], "method_name"],
      where: { status: "active" },
      order: [["id", "ASC"]],
    });

    res.ok({
      results: duplicateCheckMethods,
    });
  } catch (error) {
    next(error);
  }
};
