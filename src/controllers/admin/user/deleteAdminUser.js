import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * deleteAdminUser
 * Delete Admin User by ID
 * @param req
 * @param res
 */
export const deleteAdminUser = async (req, res, next) => {
  try {
    const adminId = req.body.id ? req.body.id : null;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";
    if (!adminId) throw StatusError.badRequest(res.__("invalidId"));

    const admin = await models.db.adminUsers.findOne({
      where: {
        id: adminId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!admin) throw StatusError.badRequest(res.__("invalid admin id"));

    const data = {
      status: "deleted",
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };
    const upRes = await models.db.adminUsers.update(data, { where: { id: adminId } });
    if (upRes) {
      await Promise.all([
        models.db.ipAccessMapping.update(data, { where: { user_id: adminId } }),
        models.db.userMenu.update(data, { where: { user_id: adminId } }),
      ]);
      return res.ok({
        message: res.__("Deleted successfully"),
      });
    } else {
      throw StatusError.badRequest(res.__("SomeThingWentWrong"));
    }
  } catch (error) {
    next(error);
  }
};
