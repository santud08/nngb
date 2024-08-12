import * as model from "../../../models/index.js";
import { Op } from "sequelize";
import { StatusError } from "../../../config/index.js";

/**
 * userDetails
 * @param req
 * @param res
 * @param next
 */
export const userDetails = async (req, res, next) => {
  try {
    const id = req.userDetails.userId ? req.userDetails.userId : null;
    if (!id) throw StatusError.badRequest("invalidId");

    let userDetails = await model.db.user.findOne({
      where: { status: "active", id: id },
      attributes: [
        ["id", "user_id"],
        "user_name",
        "email",
        "mobile",
        "name",
        "user_type",
        "gender",
        "nationality",
        "mobile_carrier",
        "bank_account_number",
        "bank_code",
        "zip_code",
        "referral_id",
        "address",
        "additional_address",
      ],
      include: [
        {
          model: model.db.userAdditionalInfo,
          as: "userAdditionalInfo",
          attributes: [
            "marital_status",
            "house_wife",
            "furniture",
            "household_income",
            "housing_type",
            "form_of_home_ownership",
            "dwelling_house_size",
            "last_degree",
            "job",
            "cell_phone_type",
            "cell_phone_manufacturer",
            "telecommunication_carrier",
            "vehicle_possession",
            "vehicle_type",
            "vehicle_brand",
            "vehicle_class",
            "smoking",
            "drinking",
            "sport_on_regular_basis",
            "hobby",
            "referrer_id",
          ],
        },
        {
          model: model.db.userHomeAppliances,
          as: "userHomeAppliances",
          attributes: ["appliance_id"],
        },
        {
          model: model.db.bankList,
          attributes: ["id", "bank_name"],
          where: { status: { [Op.ne]: "deleted" } },
        },
      ],
    });
    if (!userDetails) throw StatusError.badRequest(res.__("User not available"));
    if (userDetails && userDetails.bankList && userDetails.bankList.dataValues) {
      userDetails.dataValues.bank_id = userDetails.bankList.dataValues.id
        ? userDetails.bankList.dataValues.id
        : "";
      userDetails.dataValues.bank_name = userDetails.bankList.dataValues.bank_name
        ? userDetails.bankList.dataValues.bank_name
        : "";
      userDetails.dataValues.bank_account_number =
        userDetails && userDetails.bank_account_number ? userDetails.bank_account_number : "";
      delete userDetails.dataValues.bankList;
    }
    return res.ok(userDetails);
  } catch (error) {
    next(error);
  }
};
