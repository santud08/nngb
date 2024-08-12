import { StatusError } from "../../../config/index.js";
import * as model from "../../../models/index.js";
import { Sequelize } from "sequelize";

/**
 * getContactPersonDetails
 * get contact person details
 * @param req
 * @param res
 * @param next
 */
export const getContactPersonDetails = async (req, res, next) => {
  try {
    const contactPersonId = req.query.contact_person_id ? req.query.contact_person_id : null;
    if (!contactPersonId) throw StatusError.badRequest(res.__("invalidId"));

    let conditions = {
      id: contactPersonId,
      status: "active",
    };
    let modelName = {};
    let attributes = [];
    const orderObj = [["id", "DESC"]];
    let includeQuery = [];

    if (req.query && req.query.type && req.query.type == "interior") {
      includeQuery = [
        {
          model: model.db.bu,
          where: { status: "active" },
          required: false,
          attributes: [],
        },
        {
          model: model.db.team,
          where: { status: "active" },
          required: false,
          attributes: [],
        },
        {
          model: model.db.headquarter,
          where: { status: "active" },
          required: false,
          attributes: [],
        },
      ];
      modelName = model.db.adminUsers;

      conditions.user_type = "manager";
      conditions.vendor_id = null;
      conditions.business_ids = null;

      attributes = [
        [Sequelize.literal("`adminUsers`.`id`"), "contact_person_id"],
        [Sequelize.literal("`adminUsers`.`id`"), "code"],
        [Sequelize.literal("name"), "person_name"],
        [Sequelize.literal("`bu`.`id`"), "bu_id"],
        [Sequelize.literal("`bu`.`bu_name`"), "bu_name"],
        [Sequelize.literal("`headquarter`.`id`"), "headquarter_id"],
        [Sequelize.literal("`headquarter`.`hq_name`"), "headquarter_name"],
        [Sequelize.literal("`team`.`id`"), "team_id"],
        [Sequelize.literal("`team`.`team_name`"), "team_name"],
        "rank",
        "email",
        [Sequelize.literal("`adminUsers`.`mobile`"), "contact_no"],
        "note",
      ];
    } else {
      modelName = model.db.contactPersons;
      attributes = [
        [Sequelize.literal("`contactPersons`.`id`"), "contact_person_id"],
        [Sequelize.literal("hcode"), "code"],
        [Sequelize.literal("name"), "person_name"],
        [Sequelize.literal("null"), "bu_id"],
        [Sequelize.literal("bu_id"), "bu_name"],
        [Sequelize.literal("null"), "headquarter_id"],
        [Sequelize.literal("headquarter_id"), "headquarter_name"],
        [Sequelize.literal("null"), "team_id"],
        [Sequelize.literal("team_id"), "team_name"],
        "rank",
        "email",
        "contact_no",
        "note",
      ];
    }

    const getUser = await modelName.findOne({
      where: conditions,
      include: includeQuery,
      left: true,
      subQuery: false,
      attributes: attributes,
      order: orderObj,
      raw: true,
    });

    if (!getUser) throw StatusError.badRequest(res.__("invalidId"));

    return res.ok(getUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
