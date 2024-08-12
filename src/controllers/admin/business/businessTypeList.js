import * as model from "../../../models/index.js";

/**
 * business type List
 * @param req
 * @param res
 */
export const businessTypeList = async (req, res, next) => {
  try {
    const businessTypes = await model.db.businessTypes.findAll({
      attributes: [
        ["id", "business_id"],
        ["title", "bussiness_type"],
      ],
      where: { status: "active" },
      order: [["id", "ASC"]],
    });

    res.ok({
      results: businessTypes,
    });
  } catch (error) {
    next(error);
  }
};
