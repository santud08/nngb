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

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.body.user_id;
    const password = req.body.password;
    const newPassword = req.body.new_password;

    const userDetails = await model.db.user.findOne({
      where: { id: userId, status: "active" },
    });
    if (!userDetails) throw StatusError.badRequest("invalidId");

    const isPasswordMatch = await bcrypt.compare(password, userDetails.password);

    if (!isPasswordMatch) {
      throw StatusError.badRequest("invalidPassword");
    }

    const isPasswordSame = await bcrypt.compare(newPassword, userDetails.password);

    if (isPasswordSame) {
      throw StatusError.badRequest("youCannotUseSamePassword");
    }

    const npassword = await bcrypt.hash(newPassword, envs.passwordSalt);
    const result = await model.db.user.update({ password: npassword }, { where: { id: userId } });
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
