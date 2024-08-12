import bcrypt from "bcrypt";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * save Admin User
 * User can save admin info with details
 * @param req
 * @param res
 * @param next
 */
export const saveAdminUser = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    const checkMobile = await model.db.adminUsers.findOne({
      where: { mobile: reqBody.mobile, status: { [Op.ne]: "deleted" } },
    });
    if (checkMobile) {
      throw StatusError.badRequest(res.__("This mobile is already registered"));
    }

    const isExists = await model.db.adminUsers.findOne({
      where: { email: reqBody.email, status: { [Op.ne]: "deleted" } },
    });
    if (isExists) {
      throw StatusError.badRequest(res.__("This email is already registered"));
    }

    const checkUsername = await model.db.adminUsers.findOne({
      where: { user_name: reqBody.user_name, status: { [Op.ne]: "deleted" } },
    });
    if (checkUsername) {
      throw StatusError.badRequest(res.__("This username is already registered"));
    }

    // prepare data for insertion
    const data = {
      user_type: reqBody.user_type,
      department_id: reqBody.department_id,
      rank: reqBody.rank ? reqBody.rank : null,
      bu_id: reqBody.bu_id ? reqBody.bu_id : null,
      team_id: reqBody.team_id ? reqBody.team_id : null,
      headquarter_id: reqBody.headquarter_id ? reqBody.headquarter_id : null,
      user_name: reqBody.user_name,
      name: reqBody.name,
      email: reqBody.email,
      passwd: await bcrypt.hash(reqBody.password, envs.passwordSalt),
      mobile: reqBody.mobile,
      phone: reqBody.phone ? reqBody.phone : null,
      note: reqBody.note,
      status: reqBody.status,
      created_by: userId,
      created_at: await customDateTimeHelper.getCurrentDateTime(),
      reg_day: await customDateTimeHelper.getCurrentDateTime(),
    };
    const result = await model.db.adminUsers.create(data);

    if (result && reqBody.user_access && reqBody.user_access.length > 0) {
      for (const singleMenu of reqBody.user_access) {
        if (
          !(await model.db.userMenu.findOne({
            where: { menu_id: singleMenu, user_id: result.id, status: { [Op.ne]: "deleted" } },
          }))
        ) {
          await model.db.userMenu.create({
            menu_id: singleMenu,
            user_id: result.id,
            status: "active",
            created_by: userId,
            created_at: await customDateTimeHelper.getCurrentDateTime(),
          });
        }
      }
    }

    if (result && reqBody.user_ip_access && reqBody.user_ip_access.length > 0) {
      for (const singleIp of reqBody.user_ip_access) {
        if (
          !(await model.db.ipAccessMapping.findOne({
            where: { ip: singleIp, user_id: result.id, status: { [Op.ne]: "deleted" } },
          }))
        ) {
          await model.db.ipAccessMapping.create({
            ip: singleIp,
            user_id: result.id,
            status: "active",
            created_by: userId,
            created_at: await customDateTimeHelper.getCurrentDateTime(),
          });
        }
      }
    }

    res.ok({
      message: res.__("Saved successfully"),
    });
  } catch (error) {
    next(error);
  }
};
