import { StatusError } from "../../../config/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * Get member by ID
 * @param req
 * @param res
 */
export const memberDetails = async (req, res, next) => {
  try {
    const memberId = req.query.id ? req.query.id : null;
    if (!memberId) throw StatusError.badRequest(res.__("memberid is required"));

    const member = await models.db.user.findOne({
      attributes: [
        "id",
        "user_name",
        "name",
        "gender",
        "nationality",
        "mobile",
        "email",
        "zip_code",
        "address",
        "bank_account_number",
      ],
      where: {
        id: memberId,
        status: { [Op.ne]: "deleted" },
      },
      include: [
        {
          model: models.db.bankList,
          attributes: ["id", "bank_name"],
          where: { status: { [Op.ne]: "deleted" } },
          required: false,
        },
        {
          model: models.db.userAdditionalInfo,
          where: {
            status: { [Op.ne]: "deleted" },
          },
          include: [
            {
              model: models.db.sportsList,
              where: {
                status: { [Op.ne]: "deleted" },
              },
              required: false,
            },
            {
              model: models.db.hobbyList,
              where: {
                status: { [Op.ne]: "deleted" },
              },
              required: false,
            },
          ],
        },
        {
          model: models.db.userHomeAppliances,
          required: false,
          include: [
            {
              model: models.db.homeAppliances,
            },
          ],
          where: {
            status: { [Op.ne]: "deleted" },
          },
        },
        {
          model: models.db.subpanelUserJoined,
          where: {
            user_id: memberId,
            status: { [Op.ne]: "deleted" },
          },
          required: false,
          include: [
            {
              model: models.db.subpanel,
              where: {
                status: { [Op.ne]: "deleted" },
              },
            },
          ],
        },
      ],
    });
    if (!member) throw StatusError.badRequest(res.__("invalid user id"));
    const userDetails = {
      personal_information: {
        id: member && member.id ? member.id : "",
        user_name: member && member.user_name ? member.user_name : "",
        name: member && member.name ? member.name : "",
        gender: member && member.gender ? member.gender : "",
        nationality: member && member.nationality ? member.nationality : "",
        phone_no: member && member.mobile ? member.mobile : "",
        email: member && member.email ? member.email : "",
        zip_code: member && member.zip_code ? member.zip_code : "",
        address: member && member.address ? member.address : "",
        bank_id: member.bankList && member.bankList.id ? member.bankList.id : "",
        bank_name: member.bankList && member.bankList.bank_name ? member.bankList.bank_name : "",
        bank_ac: member && member.bank_account_number ? member.bank_account_number : "",
      },
      additional_information: {
        marital_status:
          member.userAdditionalInfo && member.userAdditionalInfo.marital_status
            ? member.userAdditionalInfo.marital_status
            : "",
        furniture:
          member.userAdditionalInfo && member.userAdditionalInfo.furniture
            ? member.userAdditionalInfo.furniture
            : "",
        housing_type:
          member.userAdditionalInfo && member.userAdditionalInfo.housing_type
            ? member.userAdditionalInfo.housing_type
            : "",
        dwelling_house_size:
          member.userAdditionalInfo && member.userAdditionalInfo.dwelling_house_size
            ? member.userAdditionalInfo.dwelling_house_size
            : "",
        job:
          member.userAdditionalInfo && member.userAdditionalInfo.job
            ? member.userAdditionalInfo.job
            : "",
        cell_phone_manufacturer:
          member.userAdditionalInfo && member.userAdditionalInfo.cell_phone_manufacturer
            ? member.userAdditionalInfo.cell_phone_manufacturer
            : "",
        vehicle_brand:
          member.userAdditionalInfo && member.userAdditionalInfo.vehicle_brand
            ? member.userAdditionalInfo.vehicle_brand
            : "",
        vehicle_ownership:
          member.userAdditionalInfo && member.userAdditionalInfo.vehicle_possession
            ? member.userAdditionalInfo.vehicle_possession
            : "",
        smoking:
          member.userAdditionalInfo && member.userAdditionalInfo.smoking
            ? member.userAdditionalInfo.smoking
            : "",
        appliances:
          member.userHomeAppliances && member.userHomeAppliances.length
            ? member.userHomeAppliances.map((appliance) => appliance.homeAppliance.appliance_name)
            : "",
        hobby:
          member.userAdditionalInfo && member.userAdditionalInfo.hobbyList
            ? member.userAdditionalInfo.hobbyList.hobby_name
            : "",
        house_wife:
          member.userAdditionalInfo && member.userAdditionalInfo.house_wife
            ? member.userAdditionalInfo.house_wife
            : "",
        household_income:
          member.userAdditionalInfo && member.userAdditionalInfo.household_income
            ? member.userAdditionalInfo.household_income
            : "",
        form_of_home_ownership:
          member.userAdditionalInfo && member.userAdditionalInfo.form_of_home_ownership
            ? member.userAdditionalInfo.form_of_home_ownership
            : "",
        last_degree:
          member.userAdditionalInfo && member.userAdditionalInfo.last_degree
            ? member.userAdditionalInfo.last_degree
            : "",
        cell_phone_type:
          member.userAdditionalInfo && member.userAdditionalInfo.cell_phone_type
            ? member.userAdditionalInfo.cell_phone_type
            : "",

        telecommunication_carrier:
          member.userAdditionalInfo && member.userAdditionalInfo.telecommunication_carrier
            ? member.userAdditionalInfo.telecommunication_carrier
            : "",
        vechile_type:
          member.userAdditionalInfo && member.userAdditionalInfo.vehicle_type
            ? member.userAdditionalInfo.vehicle_type
            : "",
        vehicle_class:
          member.userAdditionalInfo && member.userAdditionalInfo.vehicle_class
            ? member.userAdditionalInfo.vehicle_class
            : "",
        drinking:
          member.userAdditionalInfo && member.userAdditionalInfo.drinking
            ? member.userAdditionalInfo.drinking
            : "",
        sports_on_regular_basis:
          member.userAdditionalInfo && member.userAdditionalInfo.sportsList
            ? member.userAdditionalInfo.sportsList.sport_name
            : "",
        referrer_id:
          member.userAdditionalInfo && member.userAdditionalInfo.referrer_id
            ? member.userAdditionalInfo.referrer_id
            : "",
      },
      subpanels:
        member && member.subpanelUserJoineds && member.subpanelUserJoineds.length > 0
          ? member.subpanelUserJoineds.map((subpanelUserJoined) => ({
              subpanel_id: subpanelUserJoined.subpanel.id,
              subpanel_name: subpanelUserJoined.subpanel.subpanel_title,
            }))
          : [],
    };

    return res.ok({
      results: userDetails,
    });
  } catch (error) {
    next(error);
  }
};
