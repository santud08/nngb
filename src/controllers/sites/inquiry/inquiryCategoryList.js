import * as models from "../../../models/index.js";

/**
 * Inquiry Category List
 * @param req
 * @param res
 */
export const inquiryCategoryList = async (req, res, next) => {
  try {
    const reqBody = req.query;
    const panel = reqBody.panel;
    const results = await models.db.inquiryCategory.findAll({
      attributes: ["id", "category_name"],
      where: { status: "active", panel: panel },
    });

    res.ok({
      results,
    });
  } catch (error) {
    next(error);
  }
};
