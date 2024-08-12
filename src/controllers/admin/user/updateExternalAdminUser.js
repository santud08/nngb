import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * updateExternalAdminUser
 * User can update external admin with details
 * @param req
 * @param res
 * @param next
 */
export const updateExternalAdminUser = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";
    const id = reqBody.id ? reqBody.id : "";

    const checkId = await model.db.contactPersons.findOne({
      where: { id: id, status: { [Op.ne]: "deleted" } },
    });
    if (!checkId) {
      throw StatusError.badRequest(res.__("invalidId"));
    }

    const checkMobile = await model.db.contactPersons.findOne({
      where: { contact_no: reqBody.contact, id: { [Op.ne]: id }, status: { [Op.ne]: "deleted" } },
    });
    if (checkMobile) {
      throw StatusError.badRequest(res.__("This mobile is already registered"));
    }

    const isExists = await model.db.contactPersons.findOne({
      where: { email: reqBody.email, id: { [Op.ne]: id }, status: { [Op.ne]: "deleted" } },
    });
    if (isExists) {
      throw StatusError.badRequest(res.__("This email is already registered"));
    }

    // prepare data for updation
    const data = {
      name: reqBody.name,
      bu_id: reqBody.bu_id,
      rank: reqBody.rank,
      headquarter_id: reqBody.headquarter_id,
      email: reqBody.email,
      team_id: reqBody.team_id,
      contact_no: reqBody.contact,
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };
    await model.db.contactPersons.update(data, { where: { id: id } });

    res.ok({
      message: res.__("Updated successfully"),
    });
  } catch (error) {
    next(error);
  }
};
