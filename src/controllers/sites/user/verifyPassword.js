import * as model from "../../../models/index.js";
import { StatusError } from "../../../config/index.js";
import bcrypt from "bcrypt";

/**
 * verify password
 * @param req
 * @param res
 * @param next
 */
export const verifyPassword = async (req, res, next) => {
  try {
    const password = req.body.password;
    const userId = !req.userDetails.userId ? null : req.userDetails.userId;

    if (!userId) {
      throw StatusError.badRequest({ user_name: res.__("user does not exists") });
    }

    const isUserExist = await model.db.user.findOne({
      where: { status: "active", id: userId },
    });
    // comparing the password:
    const isSame = await bcrypt.compare(password, isUserExist.password);
    if (!isSame) throw StatusError.badRequest(res.__("Password does not match"));

    return res.ok({
      message: res.__("Password verified successfully!"),
    });
  } catch (error) {
    next(error);
  }
};
