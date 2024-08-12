import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * Update product
 * @param req
 * @param res
 * @param next
 */
export const productUpdate = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const productId = reqBody.product_id ? reqBody.product_id : "";
    if (!productId) throw StatusError.badRequest(res.__("Product Id is required"));

    const userId = req.userDetails && req.userDetails.userId ? req.userDetails.userId : null;
    let img_url = "";

    const startDate = reqBody.exp_start_date
      ? await customDateTimeHelper.changeDateFormat(reqBody.exp_start_date, "YYYY-MM-DD")
      : "";
    const endDate = reqBody.exp_end_date
      ? await customDateTimeHelper.changeDateFormat(reqBody.exp_end_date, "YYYY-MM-DD")
      : "";

    const getProduct = await models.db.eTicketCode.findOne({
      where: {
        id: productId,
        status: { [Op.ne]: "deleted" },
      },
    });

    if (!getProduct) throw StatusError.badRequest(res.__("invalidId"));

    const updatedData = {
      brand_name: reqBody.brand_name ? reqBody.brand_name : "",
      ticket_name: reqBody.product_name ? reqBody.product_name : "",
      status: reqBody.status ? reqBody.status : "active",
      price: reqBody.price ? reqBody.price : "",
      exp_start_date: startDate,
      exp_end_date: endDate,
      ticket_code: reqBody.product_code ? reqBody.product_code : "",
      detail: reqBody.product_detail ? reqBody.product_detail : "",
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
      updated_by: userId,
    };
    
    if (req.files && req.files.length > 0) {
      img_url = req.files[0] && req.files[0].location ? req.files[0].location : null;
      updatedData.img_url = img_url;
    }

    const productUpdate = await models.db.eTicketCode.update(updatedData, {
      where: {
        id: productId,
      },
    });
    if (productUpdate) {
      return res.ok({
        message: res.__("Updated successfully"),
      });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
