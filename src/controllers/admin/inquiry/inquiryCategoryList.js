import * as models from "../../../models/index.js";

/**
 * Inquiry Category List
 * @param req
 * @param res
 */
export const inquiryCategoryList = async (req, res, next) => {
  try {
    const results = await models.db.inquiryCategory.findAll({
      attributes: ["id", "category_name"],
      where: { status: "active" },
    });

    res.ok({
      results,
    });
  } catch (error) {
    next(error);
  }
};
