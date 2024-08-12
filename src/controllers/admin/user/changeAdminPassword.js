import bcrypt from "bcrypt";
import { StatusError } from "../../../config/index.js";
import { envs } from "../../../config/index.js";
import * as model from "../../../models/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";

/* *
 * changeAdminPassword
 * Checking verification code to user's email
 * @param req
 * @param res
 * @param next
 */

export const changeAdminPassword = async (req, res, next) => {
  try {
    const userId = req.userDetails.userId ? req.userDetails.userId : "";
    const password = req.body.password;
    const newPassword = req.body.new_password;

    const userDetails = await model.db.adminUsers.findOne({
      where: { id: userId, status: "active" },
    });
    if (!userDetails) throw StatusError.badRequest("invalidId");

    const isPasswordMatch = await bcrypt.compare(password, userDetails.passwd);

    if (!isPasswordMatch) {
      throw StatusError.badRequest("invalidPassword");
    }

    const isPasswordSame = await bcrypt.compare(newPassword, userDetails.passwd);

    if (isPasswordSame) {
      throw StatusError.badRequest("youCannotUseSamePassword");
    }

    const npassword = await bcrypt.hash(req.body.new_password, envs.passwordSalt);

    const result = await model.db.adminUsers.update(
      {
        passwd: npassword,
        updated_by: userId,
        updated_at: await customDateTimeHelper.getCurrentDateTime(),
      },
      { where: { id: userId } },
    );
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
