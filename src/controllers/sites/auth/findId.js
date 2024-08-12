import { emailService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";

/* *
 * findId
 * Sending ID to user's email
 * @param req
 * @param res
 * @param next
 */
export const findId = async (req, res, next) => {
  try {
    const mobile = req.body.mobile ? req.body.mobile : "";
    const userDetails = await model.db.user.findOne({
      where: { status: { [Op.ne]: "deleted" }, mobile: mobile },
    });
    if (!userDetails) {
      throw StatusError.badRequest({ mobile: res.__("userNotExists") });
    }
    if (userDetails.status == "inactive") {
      throw StatusError.badRequest({ mobile: res.__("user is inactive") });
    } else if (userDetails.status == "blocked") {
      throw StatusError.badRequest({ mobile: res.__("user is blocked.") });
    } else if (userDetails.status == "withdrawal") {
      throw StatusError.badRequest({
        mobile: res.__(
          "Your account has been withdrawn. Please contact the administrator for assistance.",
        ),
      });
    } else {
      // Send email
      await emailService.sendEmail(userDetails.email, "find_Id", "", "", {
        user_name: userDetails.user_name,
      });
      res.ok({ message: res.__("ID sent successfully to the registered email..") });
    }
  } catch (error) {
    next(error);
  }
};
