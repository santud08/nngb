import bcrypt from "bcrypt";
import { StatusError } from "../../../config/index.js";
import { envs } from "../../../config/index.js";
import * as model from "../../../models/index.js";

/* *
 * Checking verification code to user's email
 * @param req
 * @param res
 * @param next
 */

export const settingPassword = async (req, res, next) => {
  try {
    const userId = req.body.user_id;
    const verificationCode = req.body.verification_code;
    const userDetails = await model.db.user.findOne({
      where: { id: userId, status: "active", email_verification_code: verificationCode },
    });
    if (!userDetails) throw StatusError.badRequest("invalidId");
    const password = await bcrypt.hash(req.body.password, envs.passwordSalt);
    const result = await model.db.user.update({ password: password }, { where: { id: userId } });
    if (result && result.length > 0) {
      res.ok({
        message: res.__("success"),
      });
    } else {
      throw StatusError.serverError("serverError");
    }
  } catch (error) {
    next(error);
  }
};
