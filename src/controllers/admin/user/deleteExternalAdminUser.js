import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * deleteExternalAdminUser
 * Delete External Admin User by ID
 * @param req
 * @param res
 */
export const deleteExternalAdminUser = async (req, res, next) => {
  try {
    const externalAdminId = req.query.id ? req.query.id : null;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";
    if (!externalAdminId) throw StatusError.badRequest(res.__("invalidId"));

    const admin = await models.db.contactPersons.findOne({
      where: {
        id: externalAdminId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!admin) throw StatusError.badRequest(res.__("invalid admin id"));

    const data = {
      status: "deleted",
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };
    const upRes = await models.db.contactPersons.update(data, { where: { id: externalAdminId } });
    if (upRes) {
      await Promise.all([
        models.db.customerContactPersons.update(data, {
          where: { contact_person_id: externalAdminId, person_type: "outside", status: "active" },
        }),
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
