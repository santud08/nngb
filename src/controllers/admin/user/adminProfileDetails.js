import * as model from "../../../models/index.js";
import { StatusError } from "../../../config/StatusErrors.js";

/**
 * adminProfileDetails
 * @param req
 * @param res
 * @param next
 */
export const adminProfileDetails = async (req, res, next) => {
  try {
    const id = req.userDetails.userId ? req.userDetails.userId : null;
    if (!id) throw StatusError.badRequest(res.__("invalidId"));

    const userDetails = await model.db.adminUsers.findOne({
      where: { id: id, status: "active" },
      attributes: ["id", "email", "name", "user_type", "user_name", "phone", "mobile", "company"],
    });
    if (!userDetails) throw StatusError.badRequest(res.__("User not available"));
    return res.ok(userDetails);
  } catch (error) {
    next(error);
  }
};
