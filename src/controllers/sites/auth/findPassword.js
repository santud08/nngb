import { emailService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { generalHelper, customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

/**
 *  findPassword
 * Sending password to user's email
 * @param req
 * @param res
 * @param next
 */
export const findPassword = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userDetails = await model.db.user.findOne({
      where: {
        status: { [Op.ne]: "deleted" },
        user_name: reqBody.user_name,
        mobile: reqBody.mobile,
      },
    });

    if (!userDetails) {
      throw StatusError.badRequest(res.__("userNotExists"));
    }
    if (userDetails.status == "inactive") {
      throw StatusError.badRequest({ user_name: res.__("user is inactive") });
    } else if (userDetails.status == "blocked") {
      throw StatusError.badRequest({ user_name: res.__("user is blocked.") });
    } else if (userDetails.status == "withdrawal") {
      throw StatusError.badRequest({
        user_name: res.__(
          "Your account has been withdrawn. Please contact the administrator for assistance.",
        ),
      });
    }
    const password = generalHelper.generateRandomPasswordForUser();
    //inserting verification code
    await model.db.user.update(
      {
        password: await bcrypt.hash(password, envs.passwordSalt),
        updated_by: userDetails.id,
        updated_at: await customDateTimeHelper.getCurrentDateTime(),
      },
      {
        where: {
          id: userDetails.id,
        },
      },
    );
    // Send email
    await emailService.sendEmail(userDetails.email, "find_password", "", "", {
      name: userDetails.name,
      findPassword: password,
    });
    res.ok({
      results: { message: res.__("Password sent successfully to the registered email.") },
    });
  } catch (error) {
    next(error);
  }
};
