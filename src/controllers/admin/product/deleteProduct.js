import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * Delete product by IDs
 * @param req
 * @param res
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const productIds = req.body.product_ids ? req.body.product_ids : null;
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      throw StatusError.badRequest("Product IDs are required");
    }

    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    const availableProducts = await models.db.eTicketCode.findAll({
      where: {
        id: {
          [Op.in]: productIds,
        },
        status: { [Op.ne]: "deleted" },
      },
    });

    if (availableProducts.length !== productIds.length) {
      throw StatusError.badRequest("One or more products are not available or already deleted");
    }

    const data = {
      status: "deleted",
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };

    const [updateCount] = await models.db.eTicketCode.update(data, {
      where: { id: productIds },
    });

    if (updateCount > 0) {
      return res.json({
        message: "Product(s) deleted successfully",
      });
    } else {
      throw StatusError.badRequest(res.__("serverError"));
    }
  } catch (error) {
    next(error);
  }
};
