import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * deletePersonInCharge
 * Delete Person In Charge by ID
 * @param req
 * @param res
 */
export const deletePersonInCharge = async (req, res, next) => {
  try {
    const customerId = req.body.customer_id ? req.body.customer_id : null;
    if (!customerId) throw StatusError.badRequest(res.__("Invalid Customer Id"));

    const contactPersonId = req.body.contact_person_id ? req.body.contact_person_id : null;
    if (!contactPersonId) throw StatusError.badRequest(res.__("Invalid Contact Person Id"));

    const customerPerson = await models.db.customer.findOne({
      where: {
        id: customerId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!customerPerson) throw StatusError.badRequest(res.__("Invalid Customer Id"));

    if (req.body.person_type == "interior") {
      const isManagerExist = await models.db.adminUsers.findOne({
        where: {
          id: contactPersonId,
          status: { [Op.ne]: "deleted" },
        },
      });
      if (!isManagerExist) {
        throw StatusError.badRequest(res.__("Invalid Contact Person Id"));
      }
    } else {
      const isContactPersonExist = await models.db.contactPersons.findOne({
        where: {
          id: contactPersonId,
          status: { [Op.ne]: "deleted" },
        },
      });
      if (!isContactPersonExist) {
        throw StatusError.badRequest(res.__("Invalid Contact Person Id"));
      }
    }

    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    const contactPerson = await models.db.customerContactPersons.findOne({
      where: {
        customer_id: customerId,
        contact_person_id: contactPersonId,
        status: { [Op.ne]: "deleted" },
        person_type: req.body.person_type,
      },
    });
    if (!contactPerson) throw StatusError.badRequest(res.__("invalidId"));

    const data = {
      status: "deleted",
      updated_by: userId,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
    };
    const upRes = await models.db.customerContactPersons.update(data, {
      where: {
        customer_id: customerId,
        contact_person_id: contactPersonId,
        person_type: req.body.person_type,
      },
    });
    if (upRes) {
      return res.ok({
        message: res.__("Deleted successfully"),
      });
    } else {
      throw StatusError.badRequest(res.__("serverError"));
    }
  } catch (error) {
    next(error);
  }
};
