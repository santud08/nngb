import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * Update product status
 * @param req
 * @param res
 */
export const updateOrderRequestStatus = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const orderIds = reqBody.order_ids ? reqBody.order_ids : null;
    const requestStatus = reqBody.request_status ? reqBody.request_status : null;

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      throw StatusError.badRequest("Order IDs are required");
    }

    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    const availableRecords = await models.db.eTicketOrder.findAll({
      where: {
        id: {
          [Op.in]: orderIds,
        },
        status: { [Op.ne]: "deleted" },
        request_status: "pending",
      },
    });

    if (availableRecords.length !== orderIds.length) {
      throw StatusError.badRequest(
        "One or more Orders are not available, deleted, or not in 'pending' status",
      );
    }

    const data = {
      request_status: requestStatus,
      confirmed_at: await customDateTimeHelper.getCurrentDateTime(),
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
      updated_by: userId,
    };

    const [updateCount] = await models.db.eTicketOrder.update(data, {
      where: { id: orderIds },
    });

    if (updateCount > 0) {
      return res.json({
        message: "Order(s) updated successfully",
      });
    } else {
      throw StatusError.badRequest(res.__("serverError"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
