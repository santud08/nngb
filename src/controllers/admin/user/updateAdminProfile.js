import { Op } from "sequelize";
import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";
import { adminUserService } from "../../../services/index.js";

/**
 * updateAdminProfile
 * User can update their profile with details
 * @param req
 * @param res
 * @param next
 */
export const updateAdminProfile = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    const checkMobile = await model.db.adminUsers.findOne({
      where: { mobile: reqBody.mobile, id: { [Op.ne]: userId }, status: { [Op.ne]: "deleted" } },
    });
    if (checkMobile) {
      throw StatusError.badRequest(res.__("This mobile is already registered"));
    }

    const isExists = await model.db.adminUsers.findOne({
      where: { email: reqBody.email, id: { [Op.ne]: userId }, status: { [Op.ne]: "deleted" } },
    });
    if (isExists) {
      throw StatusError.badRequest(res.__("This email is already registered"));
    }

    const checkUser = await model.db.adminUsers.findOne({
      where: { id: userId, status: { [Op.ne]: "deleted" } },
    });

    if (!checkUser) {
      throw StatusError.badRequest(res.__("User does not exists"));
    }

    // prepare data for insertion
    const data = {
      email: reqBody.email,
      phone: reqBody.phone,
      mobile: reqBody.mobile,
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };

    await model.db.adminUsers.update(data, {
      where: {
        id: userId,
      },
    });
    let resData = {
      message: res.__("Updated successfully"),
    };
    if (checkUser.email != reqBody.email) {
      const result = await adminUserService.generateTokens(reqBody.email, checkUser.user_type);
      resData.token = result.access_token;
      resData.token_expiry = result.access_token_expiry;
    }

    res.ok(resData);
  } catch (error) {
    next(error);
  }
};
