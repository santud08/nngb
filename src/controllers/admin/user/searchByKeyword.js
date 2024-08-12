import * as model from "../../../models/index.js";
import { Sequelize, Op } from "sequelize";

/**
 * searchByKeyword
 * @param req
 * @param res
 */

export const searchByKeyword = async (req, res, next) => {
  try {
    const reqQuery = req.query;

    //Search rank
    const conditionsRank = { status: "active" };
    if (reqQuery && reqQuery.type && reqQuery.type == "rank" && reqQuery.search_text) {
      conditionsRank.rank = {
        [Op.like]: `%${reqQuery.search_text}%`,
      };
    }

    //Search hq
    //const conditionsHeadquarter = { status: "active" };
    if (reqQuery && reqQuery.type && reqQuery.type == "headquarter" && reqQuery.search_text) {
      conditionsRank.headquarter_id = {
        [Op.like]: `%${reqQuery.search_text}%`,
      };
    }

    //Search bu
    const conditionsBu = { status: "active" };
    if (reqQuery && reqQuery.type && reqQuery.type == "bu" && reqQuery.search_text) {
      conditionsBu.bu_name = {
        [Op.like]: `%${reqQuery.search_text}%`,
      };
    }

    //Search team
    const conditionsTeam = { status: "active" };
    if (reqQuery && reqQuery.type && reqQuery.type == "team" && reqQuery.search_text) {
      conditionsTeam.team_name = {
        [Op.like]: `%${reqQuery.search_text}%`,
      };
    }

    //Search company
    const conditionsCompany = { status: "active" };
    if (reqQuery && reqQuery.type && reqQuery.type == "company" && reqQuery.search_text) {
      conditionsCompany.company_customer_name = {
        [Op.like]: `%${reqQuery.search_text}%`,
      };
    }

    const includeArray = [
      // {
      //   model: model.db.adminUsers,
      //   include: [
      //     {
      //       model: model.db.bu,
      //       where: conditionsBu,
      //       required: false,
      //       left: true,
      //       attributes: ["id", "bu_name"],
      //     },
      //     {
      //       model: model.db.team,
      //       where: conditionsTeam,
      //       required: false,
      //       left: true,
      //       attributes: ["id", "team_name"],
      //     },
      //     {
      //       model: model.db.headquarter,
      //       where: conditionsHeadquarter,
      //       required: false,
      //       left: true,
      //       attributes: ["id", "hq_name"],
      //     },
      //   ],
      //   required: false,
      //   left: true,
      //   attributes: ["id", "mobile", "name", "email", "rank"],
      //   where: conditionsRank,
      // },
      {
        model: model.db.contactPersons,
        include: [
          // {
          //   model: model.db.bu,
          //   where: conditionsBu,
          //   required: false,
          //   left: true,
          //   attributes: ["id", "bu_name"],
          // },
          // {
          //   model: model.db.team,
          //   where: conditionsTeam,
          //   required: false,
          //   left: true,
          //   attributes: ["id", "team_name"],
          // },
          // {
          //   model: model.db.headquarter,
          //   where: conditionsHeadquarter,
          //   required: false,
          //   left: true,
          //   attributes: ["id", "hq_name"],
          // },
        ],
        required: false,
        left: true,
        attributes: [
          "id",
          "hcode",
          "name",
          "contact_no",
          "email",
          "rank",
          ["headquarter_id", "hq_name"],
        ],
        where: conditionsRank,
      },
      {
        model: model.db.customer,
        required: false,
        left: true,
        attributes: ["id", "company_customer_name"],
        where: conditionsCompany,
      },
    ];

    const attributes = [[Sequelize.literal("person_type"), "is_inside"]];

    const personInchargeList = await model.db.customerContactPersons.findAll({
      include: includeArray,
      attributes: attributes,
      left: true,
      subQuery: false,
      where: { status: "active" },
      order: [["id", "DESC"]],
    });

    let resultData = [];
    if (personInchargeList && personInchargeList.length && personInchargeList.length > 0) {
      let count = 1;
      for (const eachPersonIncharge of personInchargeList) {
        if (eachPersonIncharge) {
          let formatData = eachPersonIncharge.dataValues;

          if (formatData.is_inside == "outside") {
            if (reqQuery.type == "bu") {
              formatData.bu_id =
                eachPersonIncharge.dataValues &&
                eachPersonIncharge.dataValues.contactPerson &&
                eachPersonIncharge.dataValues.contactPerson.dataValues &&
                eachPersonIncharge.dataValues.contactPerson.dataValues.bu &&
                eachPersonIncharge.dataValues.contactPerson.dataValues.bu.dataValues &&
                eachPersonIncharge.dataValues.contactPerson.dataValues.bu.dataValues.id
                  ? eachPersonIncharge.dataValues.contactPerson.dataValues.bu.dataValues.id
                  : "";
              formatData.bu_name =
                eachPersonIncharge.dataValues &&
                eachPersonIncharge.dataValues.contactPerson &&
                eachPersonIncharge.dataValues.contactPerson.dataValues &&
                eachPersonIncharge.dataValues.contactPerson.dataValues.bu &&
                eachPersonIncharge.dataValues.contactPerson.dataValues.bu.dataValues &&
                eachPersonIncharge.dataValues.contactPerson.dataValues.bu.dataValues.bu_name
                  ? eachPersonIncharge.dataValues.contactPerson.dataValues.bu.dataValues.bu_name
                  : "";
            }

            // if (reqQuery.type == "headquarter") {
            //   formatData.headquarter_id =
            //     eachPersonIncharge.dataValues &&
            //     eachPersonIncharge.dataValues.contactPerson &&
            //     eachPersonIncharge.dataValues.contactPerson.dataValues &&
            //     eachPersonIncharge.dataValues.contactPerson.dataValues.headquarter &&
            //     eachPersonIncharge.dataValues.contactPerson.dataValues.headquarter.dataValues &&
            //     eachPersonIncharge.dataValues.contactPerson.dataValues.headquarter.dataValues.id
            //       ? eachPersonIncharge.dataValues.contactPerson.dataValues.headquarter.dataValues.id
            //       : "";
            //   formatData.headquarter_name =
            //     eachPersonIncharge.dataValues &&
            //     eachPersonIncharge.dataValues.contactPerson &&
            //     eachPersonIncharge.dataValues.contactPerson.dataValues &&
            //     eachPersonIncharge.dataValues.contactPerson.dataValues.headquarter &&
            //     eachPersonIncharge.dataValues.contactPerson.dataValues.headquarter.dataValues &&
            //     eachPersonIncharge.dataValues.contactPerson.dataValues.headquarter.dataValues
            //       .hq_name
            //       ? eachPersonIncharge.dataValues.contactPerson.dataValues.headquarter.dataValues
            //           .hq_name
            //       : "";
            // }

            if (reqQuery.type == "headquarter") {
              formatData.headquarter_id = count;
              count = count + 1;
              formatData.headquarter_name =
                eachPersonIncharge.dataValues &&
                eachPersonIncharge.dataValues.contactPerson &&
                eachPersonIncharge.dataValues.contactPerson.dataValues &&
                eachPersonIncharge.dataValues.contactPerson.dataValues.hq_name
                  ? eachPersonIncharge.dataValues.contactPerson.dataValues.hq_name
                  : "";
            }

            if (reqQuery.type == "team") {
              formatData.team_id =
                eachPersonIncharge.dataValues &&
                eachPersonIncharge.dataValues.contactPerson &&
                eachPersonIncharge.dataValues.contactPerson.dataValues &&
                eachPersonIncharge.dataValues.contactPerson.dataValues.team &&
                eachPersonIncharge.dataValues.contactPerson.dataValues.team.dataValues &&
                eachPersonIncharge.dataValues.contactPerson.dataValues.team.dataValues.id
                  ? eachPersonIncharge.dataValues.contactPerson.dataValues.team.dataValues.id
                  : "";
              formatData.team_name =
                eachPersonIncharge.dataValues &&
                eachPersonIncharge.dataValues.contactPerson &&
                eachPersonIncharge.dataValues.contactPerson.dataValues &&
                eachPersonIncharge.dataValues.contactPerson.dataValues.team &&
                eachPersonIncharge.dataValues.contactPerson.dataValues.team.dataValues &&
                eachPersonIncharge.dataValues.contactPerson.dataValues.team.dataValues.team_name
                  ? eachPersonIncharge.dataValues.contactPerson.dataValues.team.dataValues.team_name
                  : "";
            }

            if (reqQuery.type == "rank") {
              formatData.rank =
                eachPersonIncharge.dataValues &&
                eachPersonIncharge.dataValues.contactPerson &&
                eachPersonIncharge.dataValues.contactPerson.dataValues &&
                eachPersonIncharge.dataValues.contactPerson.dataValues.rank
                  ? eachPersonIncharge.dataValues.contactPerson.dataValues.rank
                  : "";
            }

            delete eachPersonIncharge.dataValues.is_inside;
          }

          if (reqQuery.type == "company") {
            formatData.company_id =
              eachPersonIncharge.dataValues &&
              eachPersonIncharge.dataValues.customer &&
              eachPersonIncharge.dataValues.customer.dataValues &&
              eachPersonIncharge.dataValues.customer.dataValues.id
                ? eachPersonIncharge.dataValues.customer.dataValues.id
                : "";
            formatData.company_name =
              eachPersonIncharge.dataValues &&
              eachPersonIncharge.dataValues.customer &&
              eachPersonIncharge.dataValues.customer.dataValues &&
              eachPersonIncharge.dataValues.customer.dataValues.company_customer_name
                ? eachPersonIncharge.dataValues.customer.dataValues.company_customer_name
                : "";
          }

          delete eachPersonIncharge.dataValues.adminUser;
          delete eachPersonIncharge.dataValues.contactPerson;
          delete eachPersonIncharge.dataValues.customer;

          resultData.push(formatData);
        }
      }
    }

    //Removing duplicate
    if (reqQuery.type == "headquarter") {
      const uniqueHeadquarters = {};
      resultData = resultData.filter((item) => {
        console.log("item", item);
        const isBlankHq = item.headquarter_name ? !item.headquarter_name.trim() : "";
        if (!uniqueHeadquarters[item.headquarter_id] && !isBlankHq) {
          uniqueHeadquarters[item.headquarter_id] = true;
          return true;
        }
        return false;
      });
      resultData.sort((a, b) => a.headquarter_id - b.headquarter_id);
    } else if (reqQuery.type == "team") {
      const uniqueTeams = {};
      resultData = resultData.filter((item) => {
        const isBlankTeam = !item.team_name.trim();
        if (!uniqueTeams[item.team_id] && !isBlankTeam) {
          uniqueTeams[item.team_id] = true;
          return true;
        }
        return false;
      });
      resultData.sort((a, b) => a.team_id - b.team_id);
    } else if (reqQuery.type == "bu") {
      const uniqueBu = {};
      resultData = resultData.filter((item) => {
        const isBlankBu = !item.bu_name.trim();
        if (!uniqueBu[item.bu_id] && !isBlankBu) {
          uniqueBu[item.bu_id] = true;
          return true;
        }
        return false;
      });
      resultData.sort((a, b) => a.bu_id - b.bu_id);
    } else if (reqQuery.type == "rank") {
      const uniqueRank = {};
      resultData = resultData.filter((item) => {
        const isBlankRank = !item.rank.trim();
        if (!uniqueRank[item.rank] && !isBlankRank) {
          uniqueRank[item.rank] = true;
          return true;
        }
        return false;
      });
    } else if (reqQuery.type == "company") {
      const uniqueCompany = {};
      resultData = resultData.filter((item) => {
        const isBlankCompany = !item.company_name.trim();
        if (!uniqueCompany[item.company_id] && !isBlankCompany) {
          uniqueCompany[item.company_id] = true;
          return true;
        }
        return false;
      });
      resultData.sort((a, b) => a.company_id - b.company_id);
    }

    return res.ok({
      results: resultData, //resultData
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
