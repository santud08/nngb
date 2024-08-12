import { StatusError } from "../../../config/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";
import { Sequelize } from "sequelize";

/**
 * externalAdminUserDetails
 * Get external admin User Details by ID
 * @param req
 * @param res
 */
export const externalAdminUserDetails = async (req, res, next) => {
  try {
    const externalAdminId = req.query.id ? req.query.id : null;

    if (!externalAdminId) throw StatusError.badRequest(res.__("invalidId"));
    let admin = await models.db.contactPersons.findOne({
      attributes: [
        "id",
        ["hcode", "code"],
        "name",
        "email",
        ["contact_no", "contact"],
        "rank",
        [Sequelize.literal("null"), "bu_id"],
        ["bu_id", "bu_name"],
        [Sequelize.literal("null"), "team_id"],
        ["team_id", "team_name"],
        [Sequelize.literal("null"), "headquarter_id"],
        ["headquarter_id", "headquarter_name"],
      ],
      where: {
        id: externalAdminId,
        status: { [Op.ne]: "deleted" },
      },
      include: [
        // {
        //   model: models.db.bu,
        //   attributes: [],
        //   where: { status: { [Op.ne]: "deleted" } },
        //   required: false,
        // },
        // {
        //   model: models.db.team,
        //   attributes: [],
        //   where: { status: { [Op.ne]: "deleted" } },
        //   required: false,
        // },
        // {
        //   model: models.db.headquarter,
        //   attributes: [],
        //   where: { status: { [Op.ne]: "deleted" } },
        //   required: false,
        // },
      ],
      raw: true,
    });
    if (!admin) throw StatusError.badRequest(res.__("invalid admin id"));

    admin.customers = await models.db.customer.findAll({
      attributes: ["id", "company_customer_name"],
      where: { status: "active" },
      include: [
        {
          model: models.db.customerContactPersons,
          as: "outsidePerson",
          attributes: [],
          where: {
            status: { [Op.ne]: "deleted" },
            person_type: "outside",
            contact_person_id: externalAdminId,
          },
        },
      ],
      required: false,
      order: [["id", "asc"]],
    });
    return res.ok(admin);
  } catch (error) {
    next(error);
  }
};
