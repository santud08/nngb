import * as model from "../../../models/index.js";
import { Sequelize, Op } from "sequelize";

/**
 * getAllContactPersonSearch
 * get all contact person search
 * @param req
 * @param res
 * @param next
 */
export const getAllContactPersonSearch = async (req, res, next) => {
  try {
    const reqQuery = req.query;

    let conditions = {
      status: "active",
      name: {
        [Op.like]: `%${reqQuery.search_text}%`,
      },
    };
    let modelName = {};
    let attributes = [];
    let orderObj = [["id", "DESC"]];
    let includeQuery = [];
    if (reqQuery && reqQuery.type && reqQuery.type == "interior") {
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
      conditions.user_type = "manager";
      conditions.vendor_id = null;
      conditions.business_ids = null;
      modelName = model.db.adminUsers;
      attributes = [
        [Sequelize.literal("`adminUsers`.`id`"), "person_id"],
        [Sequelize.literal("`adminUsers`.`id`"), "code"],
        [Sequelize.literal("name"), "person_name"],
        [Sequelize.literal("`adminUsers`.`email`"), "email"],
        [Sequelize.literal("`adminUsers`.`rank`"), "rank"],
        [Sequelize.literal("`adminUsers`.`phone`"), "phone"],
        [Sequelize.literal("`bu`.`bu_name`"), "bu_name"],
        [Sequelize.literal("`headquarter`.`hq_name`"), "headquarter_name"],
        [Sequelize.literal("`team`.`team_name`"), "team_name"],
      ];
    } else {
      modelName = model.db.contactPersons;
      attributes = [
        [Sequelize.literal("`contactPersons`.`id`"), "person_id"],
        [Sequelize.literal("hcode"), "code"],
        [Sequelize.literal("name"), "person_name"],
        [Sequelize.literal("`contactPersons`.`email`"), "email"],
        [Sequelize.literal("`contactPersons`.`rank`"), "rank"],
        [Sequelize.literal("`contactPersons`.`contact_no`"), "phone"],
        [Sequelize.literal("bu_id"), "bu_name"],
        [Sequelize.literal("headquarter_id"), "headquarter_name"],
        [Sequelize.literal("team_id"), "team_name"],
      ];
    }

    const getUserList = await modelName.findAll({
      where: conditions,
      include: includeQuery,
      left: true,
      subQuery: false,
      attributes: attributes,
      order: orderObj,
    });

    return res.ok({
      results: getUserList,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
