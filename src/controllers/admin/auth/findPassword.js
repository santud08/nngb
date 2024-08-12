import { emailService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { generalHelper, customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";
import bcrypt from "bcrypt";

/**
 * Sending password to user's email
 * @param req
 * @param res
 * @param next
 */
export const findPassword = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userDetails = await model.db.adminUsers.findOne({
      where: {
        status: "active",
        user_id: reqBody.user_id,
      },
    });

    if (!userDetails) {
      throw StatusError.badRequest(res.__("userNotExists"));
    }

    const password = generalHelper.generateRandomPasswordForUser();
    //inserting verification code
    await model.db.adminUsers.update(
      {
        passwd: await bcrypt.hash(password, envs.passwordSalt),
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
      message: res.__("Password sent successfully to the registered email."),
      password: password,
    });
  } catch (error) {
    next(error);
  }
};
