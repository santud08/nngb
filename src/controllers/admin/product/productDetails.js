import { StatusError } from "../../../config/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";
import path from 'path';

/**
 * product details
 * @param req
 * @param res
 */
export const productDetails = async (req, res, next) => {
  try {
    const productId = req.params.id ? req.params.id : null;
    if (!productId) throw StatusError.badRequest(res.__("Product Id is required"));
    const getProduct = await models.db.eTicketCode.findOne({
      where: {
        id: productId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!getProduct) throw StatusError.badRequest("invalidId");

    const conditions = { id: productId, status: { [Op.ne]: "deleted" } };
    const selectAttributes = [
      ["id", "product_id"],
      "brand_name",
      ["ticket_name", "product_name"],
      ["img_url", "product_image"],
      "status",
      "price",
      ["ticket_code", "product_code"],
      "exp_start_date",
      "exp_end_date",
      ["detail", "product_details"],
    ];

    const resultData = await models.db.eTicketCode.findOne({
      where: conditions,
      attributes: selectAttributes,
    });
    const fileLocation = resultData.dataValues.product_image;
    const fileName = path.basename(fileLocation);
    const responseData = {
      ...resultData.toJSON(),
      fileName: fileName,
    };
    return res.ok( responseData);
  } catch (error) {
    next(error);
  }
};
