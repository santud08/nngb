import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * Update producr category
 * @param req
 * @param res
 * @param next
 */
export const updateProductCategory = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const productCategoryId = reqBody.category_id ? reqBody.category_id : "";
    if (!productCategoryId) throw StatusError.badRequest(res.__("Category Id is required"));

    let image_url = "";
    const userId = req.userDetails.userId ? req.userDetails.userId : "";
    if (req.files && req.files.length > 0) {
      image_url = req.files[0] && req.files[0].location ? req.files[0].location : null;
    } else {
      throw StatusError.badRequest(res.__("Category image is required"));
    }

    const getProductCategory = await models.db.eTicketCodeCategory.findOne({
      where: {
        id: productCategoryId,
        status: { [Op.ne]: "deleted" },
      },
    });

    if (!getProductCategory) throw StatusError.badRequest(res.__("invalidId"));

    const updatedData = {
      category_name: reqBody.category_name ? reqBody.category_name : "",
      img_url: image_url || "",
      description: reqBody.category_desc ? reqBody.category_desc : "",
      status: "active",
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
      updated_by: userId,
    };

    const productCategoryUpdate = await models.db.eTicketCodeCategory.update(updatedData, {
      where: {
        id: productCategoryId,
      },
    });
    if (productCategoryUpdate) {
      return res.ok({
        message: res.__("Updated successfully"),
      });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    next(error);
  }
};
