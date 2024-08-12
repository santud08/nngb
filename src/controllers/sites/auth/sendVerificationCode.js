import { emailService, userService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";
import { generalHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";

/* *
 * Sending verification code to user's email
 * @param req
 * @param res
 * @param next
 */
export const sendVerificationCodeToEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const userDetails = await userService.getByEmail(email);
    if (!userDetails) throw StatusError.badRequest({ email: res.__("email does not exists") });

    const verificationCode = await generalHelper.generateRandomAlphanumeric(8);
    const userFirstName = userDetails.name;

    //inserting verification code
    const result = await model.db.user.update(
      { email_verification_code: verificationCode },
      { where: { id: userDetails.id } },
    );
    //email send
    if (result && result.length > 0) {
      await emailService.sendEmail(email, "reset_password", "", "", {
        firstName: userFirstName,
        resetCode: verificationCode,
      });
      res.ok({
        message: res.__("success"),
      });
    } else {
      throw StatusError.badRequest({ userId: res.__("userIdNotExists") });
    }
  } catch (error) {
    next(error);
  }
};
