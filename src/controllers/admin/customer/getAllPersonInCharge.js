import * as model from "../../../models/index.js";
import { Sequelize } from "sequelize";
import { paginationService } from "../../../services/index.js";
import { PAGINATION_LIMIT } from "../../../utils/constants.js";

/**
 * getAllPersonInCharge
 * @param req
 * @param res
 */

export const getAllPersonInCharge = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const defautlPageNo = 1;
    const page = reqBody.page ? reqBody.page : defautlPageNo;
    const limit = reqBody.limit ? reqBody.limit : PAGINATION_LIMIT;
    const sortBy = reqBody.sort_by ? reqBody.sort_by : "id";
    const sortOrder = reqBody.sort_order ? reqBody.sort_order : "DESC";
    const searchParams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };

    const conditions = {
      status: "active",
      customer_id: reqBody.customer_id,
    };

    const includeArray = [
      {
        model: model.db.adminUsers,
        include: [
          {
            model: model.db.bu,
            where: { status: "active" },
            required: false,
            left: true,
            attributes: ["id", "bu_name"],
          },
          {
            model: model.db.team,
            where: { status: "active" },
            required: false,
            left: true,
            attributes: ["id", "team_name"],
          },
          {
            model: model.db.headquarter,
            where: { status: "active" },
            required: false,
            left: true,
            attributes: ["id", "hq_name"],
          },
        ],
        required: false,
        left: true,
        attributes: ["id", "mobile", "name", "email"],
      },
      {
        model: model.db.contactPersons,
        // include: [
        //   {
        //     model: model.db.bu,
        //     where: { status: "active" },
        //     required: false,
        //     left: true,
        //     attributes: ["id", "bu_name"],
        //   },
        //   {
        //     model: model.db.team,
        //     where: { status: "active" },
        //     required: false,
        //     left: true,
        //     attributes: ["id", "team_name"],
        //   },
        //   {
        //     model: model.db.headquarter,
        //     where: { status: "active" },
        //     required: false,
        //     left: true,
        //     attributes: ["id", "hq_name"],
        //   },
        // ],
        required: false,
        left: true,
        attributes: [
          "id",
          "hcode",
          "name",
          "contact_no",
          "email",
          ["bu_id", "bu_name"],
          ["team_id", "team_name"],
          ["headquarter_id", "hq_name"],
        ],
      },
    ];

    const attributes = [
      "id",
      "contact_person_id",
      [
        Sequelize.fn(
          "IFNULL",
          Sequelize.literal("CASE WHEN person_type = 'interior' THEN adminUser.id ELSE NULL END"),
          Sequelize.literal(
            "CASE WHEN person_type = 'outside' THEN contactPerson.hcode ELSE NULL END",
          ),
        ),
        "code",
      ],
      [
        Sequelize.literal(
          "CASE WHEN person_type = 'interior' THEN adminUser.name ELSE contactPerson.name END",
        ),
        "name",
      ],
      [Sequelize.literal("person_type"), "is_inside"],
      [
        Sequelize.literal(
          "CASE WHEN person_type = 'interior' THEN adminUser.mobile ELSE contactPerson.contact_no END",
        ),
        "contact",
      ],
      [
        Sequelize.literal(
          "CASE WHEN person_type = 'interior' THEN adminUser.email ELSE contactPerson.email END",
        ),
        "email",
      ],
      "note",
    ];

    const personInchargeList = await paginationService.pagination(
      searchParams,
      model.db.customerContactPersons,
      includeArray,
      conditions,
      attributes,
    );
    let resultData = [];
    if (personInchargeList && personInchargeList.rows.length > 0) {
      for (const eachPersonIncharge of personInchargeList.rows) {
        if (eachPersonIncharge) {
          let formatData = eachPersonIncharge.dataValues;
          if (formatData.is_inside == "interior") {
            formatData.bu =
              eachPersonIncharge.dataValues &&
              eachPersonIncharge.dataValues.adminUser &&
              eachPersonIncharge.dataValues.adminUser.dataValues &&
              eachPersonIncharge.dataValues.adminUser.dataValues.bu &&
              eachPersonIncharge.dataValues.adminUser.dataValues.bu.dataValues &&
              eachPersonIncharge.dataValues.adminUser.dataValues.bu.dataValues.bu_name
                ? eachPersonIncharge.dataValues.adminUser.dataValues.bu.dataValues.bu_name
                : "";
            formatData.headquarters =
              eachPersonIncharge.dataValues &&
              eachPersonIncharge.dataValues.adminUser &&
              eachPersonIncharge.dataValues.adminUser.dataValues &&
              eachPersonIncharge.dataValues.adminUser.dataValues.headquarter &&
              eachPersonIncharge.dataValues.adminUser.dataValues.headquarter.dataValues &&
              eachPersonIncharge.dataValues.adminUser.dataValues.headquarter.dataValues.hq_name
                ? eachPersonIncharge.dataValues.adminUser.dataValues.headquarter.dataValues.hq_name
                : "";
            formatData.team =
              eachPersonIncharge.dataValues &&
              eachPersonIncharge.dataValues.adminUser &&
              eachPersonIncharge.dataValues.adminUser.dataValues &&
              eachPersonIncharge.dataValues.adminUser.dataValues.team &&
              eachPersonIncharge.dataValues.adminUser.dataValues.team.dataValues &&
              eachPersonIncharge.dataValues.adminUser.dataValues.team.dataValues.team_name
                ? eachPersonIncharge.dataValues.adminUser.dataValues.team.dataValues.team_name
                : "";
          }
          if (formatData.is_inside == "outside") {
            formatData.bu =
              eachPersonIncharge.dataValues &&
              eachPersonIncharge.dataValues.contactPerson &&
              eachPersonIncharge.dataValues.contactPerson.dataValues &&
              eachPersonIncharge.dataValues.contactPerson.dataValues.bu_name
                ? eachPersonIncharge.dataValues.contactPerson.dataValues.bu_name
                : "";
            formatData.headquarters =
              eachPersonIncharge.dataValues &&
              eachPersonIncharge.dataValues.contactPerson &&
              eachPersonIncharge.dataValues.contactPerson.dataValues &&
              eachPersonIncharge.dataValues.contactPerson.dataValues.hq_name
                ? eachPersonIncharge.dataValues.contactPerson.dataValues.hq_name
                : "";
            formatData.team =
              eachPersonIncharge.dataValues &&
              eachPersonIncharge.dataValues.contactPerson &&
              eachPersonIncharge.dataValues.contactPerson.dataValues &&
              eachPersonIncharge.dataValues.contactPerson.dataValues.team_name
                ? eachPersonIncharge.dataValues.contactPerson.dataValues.team_name
                : "";
          }

          delete eachPersonIncharge.dataValues.adminUser;
          delete eachPersonIncharge.dataValues.contactPerson;

          resultData.push(formatData);
        }
      }
    }
    return res.ok({
      page: page,
      limit: limit,
      total_records: personInchargeList.count,
      total_pages: personInchargeList.count > 0 ? Math.ceil(personInchargeList.count / limit) : 0,
      results: resultData,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};
