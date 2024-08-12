import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * updateAdminUser
 * User can update admin with details
 * @param req
 * @param res
 * @param next
 */
export const updateAdminUser = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";
    const id = reqBody.id ? reqBody.id : "";

    const checkId = await model.db.adminUsers.findOne({
      where: { id: id, status: { [Op.ne]: "deleted" } },
    });

    if (!checkId) {
      throw StatusError.badRequest(res.__("invalidId"));
    }

    const checkMobile = await model.db.adminUsers.findOne({
      where: { mobile: reqBody.mobile, id: { [Op.ne]: id }, status: { [Op.ne]: "deleted" } },
    });
    if (checkMobile) {
      throw StatusError.badRequest(res.__("This mobile is already registered"));
    }

    const isExists = await model.db.adminUsers.findOne({
      where: { email: reqBody.email, id: { [Op.ne]: id }, status: { [Op.ne]: "deleted" } },
    });
    if (isExists) {
      throw StatusError.badRequest(res.__("This email is already registered"));
    }

    // prepare data for updation
    const data = {
      user_type: reqBody.user_type,
      department_id: reqBody.department_id,
      email: reqBody.email,
      mobile: reqBody.mobile,
      phone: reqBody.phone ? reqBody.phone : null,
      rank: reqBody.rank ? reqBody.rank : null,
      bu_id: reqBody.bu_id ? reqBody.bu_id : null,
      team_id: reqBody.team_id ? reqBody.team_id : null,
      headquarter_id: reqBody.headquarter_id,
      note: reqBody.note,
      status: reqBody.status,
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };
    await model.db.adminUsers.update(data, { where: { id: id } });

    if (id && reqBody.user_access && reqBody.user_access.length > 0) {
      for (const singleMenu of reqBody.user_access) {
        if (singleMenu.action && singleMenu.action == "a") {
          const isMenuExists = await model.db.userMenu.findOne({
            where: {
              menu_id: singleMenu.menu_id,
              user_id: id,
              status: { [Op.ne]: "deleted" },
            },
          });
          if (!isMenuExists) {
            await model.db.userMenu.create({
              menu_id: singleMenu.menu_id,
              user_id: id,
              status: "active",
              created_by: userId,
              created_at: await customDateTimeHelper.getCurrentDateTime(),
            });
          }
        } else if (singleMenu.action && singleMenu.action == "d") {
          await model.db.userMenu.update(
            {
              status: "deleted",
              updated_by: userId,
              updated_at: await customDateTimeHelper.getCurrentDateTime(),
            },
            { where: { id: singleMenu.access_id, user_id: id } },
          );
        }
      }
    }

    if (id && reqBody.user_ip_access && reqBody.user_ip_access.length) {
      for (const singleIp of reqBody.user_ip_access) {
        if (singleIp.action && singleIp.action == "a") {
          const isIpExists = await model.db.ipAccessMapping.findOne({
            where: {
              ip: singleIp.ip,
              user_id: id,
              status: { [Op.ne]: "deleted" },
            },
          });
          if (!isIpExists) {
            await model.db.ipAccessMapping.create({
              ip: singleIp.ip,
              user_id: id,
              status: "active",
              created_by: userId,
              created_at: await customDateTimeHelper.getCurrentDateTime(),
            });
          }
        } else if (singleIp.action && singleIp.action == "d") {
          await model.db.ipAccessMapping.update(
            {
              status: "deleted",
              updated_by: userId,
              updated_at: await customDateTimeHelper.getCurrentDateTime(),
            },
            { where: { id: singleIp.id, user_id: id } },
          );
        }
      }
    }

    res.ok({
      message: res.__("Updated successfully"),
    });
  } catch (error) {
    next(error);
  }
};
