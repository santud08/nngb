import * as models from "../../../models/index.js";
import { StatusError } from "../../../config/StatusErrors.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { Op } from "sequelize";

/**
 * product Registration
 * @param req
 * @param res
 * @param next
 */

export const productRegistration = async (req, res, next) => {
  try {
    const reqBody = req.body;
    let img_url = "";
    const userId = req.userDetails.userId ? req.userDetails.userId : "";
    const categoryId = reqBody.category_id ? reqBody.category_id : null;
    if (!categoryId) throw StatusError.badRequest(res.__("Category Id is required"));
    const getProductCategory = await models.db.eTicketCodeCategory.findOne({
      where: {
        id: categoryId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!getProductCategory) throw StatusError.badRequest("invalidId");

    if (req.files && req.files.length > 0) {
      img_url = req.files[0] && req.files[0].location ? req.files[0].location : null;
    } else {
      throw StatusError.badRequest(res.__("Product image is required"));
    }
    const startDate = reqBody.exp_start_date
      ? await customDateTimeHelper.changeDateFormat(reqBody.exp_start_date, "YYYY-MM-DD")
      : "";
    const endDate = reqBody.exp_end_date
      ? await customDateTimeHelper.changeDateFormat(reqBody.exp_end_date, "YYYY-MM-DD")
      : "";

    const productData = {
      category_id: getProductCategory && getProductCategory.id ? getProductCategory.id : "",
      business_id: 0,
      brand_name: reqBody.brand_name ? reqBody.brand_name : "",
      ticket_name: reqBody.product_name ? reqBody.product_name : "",
      img_url: img_url || "",
      status: reqBody.status ? reqBody.status : "active",
      price: reqBody.price ? reqBody.price : "",
      exp_start_date: startDate,
      exp_end_date: endDate,
      ticket_code: reqBody.product_code ? reqBody.product_code : "",
      detail: reqBody.product_detail ? reqBody.product_detail : "",
      created_at: await customDateTimeHelper.getCurrentDateTime(),
      created_by: userId,
    };
    const registeredproduct = await models.db.eTicketCode.create(productData);
    if (registeredproduct) {
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
