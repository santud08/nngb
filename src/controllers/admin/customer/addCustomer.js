import * as model from "../../../models/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { StatusError } from "../../../config/index.js";

/**
 * adminReply
 * vendorAdd of the customer
 * @param req
 * @param res
 */

export const addCustomer = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId;
    const parentId = reqBody.parent_id || null;
    if (parentId) {
      const checkParentId = await model.db.inquiry.findOne({
        where: { id: parentId, status: "active" },
      });
      if (!checkParentId) throw StatusError.badRequest(res.__("parent id does not exists"));
    }
    const inquiries = {
      parent_id: parentId,
      inquiry_category_id: reqBody.inquiry_category_id,
      inquiry_title: reqBody.inquiry_title,
      inquiry_description: reqBody.inquiry_description,
      panel: reqBody.panel,
      user_email: reqBody.user_email,
      status: "active",
      created_by: userId,
      created_at: await customDateTimeHelper.getCurrentDateTime(),
    };

    const createdinquiry = await model.db.inquiry.create(inquiries);
    if (parentId && createdinquiry) {
      const updateParentData = {
        inquiry_status: "pending",
        updated_at: await customDateTimeHelper.getCurrentDateTime(),
        updated_by: userId,
      };
      await model.db.inquiry.update(updateParentData, {
        where: {
          id: parentId,
        },
      });
    }
    if (createdinquiry) {
      return res.ok({ message: res.__("success") });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    next(error);
  }
};
