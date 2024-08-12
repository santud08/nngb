import { StatusError } from "../../../config/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * product category details
 * @param req
 * @param res
 */
export const productCategoryDetails = async (req, res, next) => {
  try {
    const categoryId = req.params.id ? req.params.id : null;
    if (!categoryId) throw StatusError.badRequest(res.__("Category Id is required"));
    const getProductCategory = await models.db.eTicketCodeCategory.findOne({
      where: {
        id: categoryId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!getProductCategory) throw StatusError.badRequest("invalidId");

    const conditions = { id: categoryId, status: { [Op.ne]: "deleted" } };
    const selectAttributes = [
      ["id", "category_id"],
      ["category_name", "category_name"],
      ["img_url", "category_image"],
      ["description", "category_desc"],
    ];

    const resultData = await models.db.eTicketCodeCategory.findOne({
      where: conditions,
      attributes: selectAttributes,
    });

    return res.ok(resultData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
