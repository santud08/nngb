import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * Delete product category by ID
 * @param req
 * @param res
 */
export const deleteProductCategory = async (req, res, next) => {
  try {
    const productCategoryId = req.body.id ? req.body.id : null;
    if (!productCategoryId) throw StatusError.badRequest("Category Id is required");

    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    const getProductCategory = await models.db.eTicketCodeCategory.findOne({
      where: {
        id: productCategoryId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!getProductCategory) throw StatusError.badRequest("invalidId");

    const data = {
      status: "deleted",
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };

    const updateCategory = await models.db.eTicketCodeCategory.update(data, {
      where: { id: productCategoryId },
    });

    if (updateCategory) {
      return res.ok({
        message: res.__("Deleted successfully"),
      });
    } else {
      throw StatusError.badRequest(res.__("serverError"));
    }
  } catch (error) {
    next(error);
  }
};
