import * as model from "../../../models/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { StatusError } from "../../../config/index.js";
import { Op } from "sequelize";

/**
 * adminReply
 * inquiry of the customer
 * @param req
 * @param res
 */

export const adminReply = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : null;
    const inquiryId = reqBody.inquiry_id || null;
    const inquiryAns = reqBody.inquiry_answer || null;

    if (!inquiryId) throw StatusError.badRequest(res.__("invalidId"));

    const checkId = await model.db.inquiry.findOne({
      where: { id: inquiryId, status: { [Op.ne]: "deleted" } },
    });

    if (!checkId) {
      throw StatusError.badRequest(res.__("inquiry id does not exist"));
    }

    // Update the current inquiry
    const updatedInquiry = {
      inquiry_status: "answered",
      inquiry_answer: inquiryAns,
      replied_at: await customDateTimeHelper.getCurrentDateTime(),
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
      updated_by: userId,
    };
    await model.db.inquiry.update(updatedInquiry, { where: { id: inquiryId } });

    // Check if parent_id is available
    if (checkId.parent_id > 0) {
      await model.db.inquiry.update(
        {
          inquiry_status: "answered",
          replied_at: await customDateTimeHelper.getCurrentDateTime(),
          updated_at: await customDateTimeHelper.getCurrentDateTime(),
          updated_by: userId,
        },
        { where: { id: checkId.parent_id } },
      );
    }

    return res.ok({
      message: res.__("success"),
    });
  } catch (error) {
    next(error);
  }
};
