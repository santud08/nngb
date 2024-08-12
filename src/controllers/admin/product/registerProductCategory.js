import * as model from "../../../models/index.js";
import { StatusError } from "../../../config/StatusErrors.js";
import { customDateTimeHelper } from "../../../helpers/index.js";

/**
 * Register product Category
 * @param req
 * @param res
 * @param next
 */

export const registerProductCategory = async (req, res, next) => {
  try {
    let reqBody = req.body;
    let image_url = "";
    const userId = req.userDetails.userId ? req.userDetails.userId : "";
    if (req.files && req.files.length > 0) {
      image_url = req.files[0] && req.files[0].location ? req.files[0].location : null;
    } else {
      throw StatusError.badRequest(res.__("Category image is required"));
    }
    const CategoryData = {
      category_name: reqBody.category_name ? reqBody.category_name : "",
      img_url: image_url || "",
      description: reqBody.category_desc ? reqBody.category_desc : "",
      status: "active",
      created_at: await customDateTimeHelper.getCurrentDateTime(),
      created_by: userId,
    };

    const projectCategory = await model.db.eTicketCodeCategory.create(CategoryData);
    if (projectCategory) {
      return res.ok({
        message: res.__("Registered successfully"),
      });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
