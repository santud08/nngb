import bcrypt from "bcrypt";
import { userService, pointsService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * signup
 * User can signup with details
 * @param req
 * @param res
 * @param next
 */
export const signup = async (req, res, next) => {
  try {
    const reqBody = req.body;

    const checkUserId = await model.db.user.findOne({
      where: { status: { [Op.ne]: "deleted" }, user_name: reqBody.user_name },
    });
    const checkMobile = await model.db.user.findOne({
      where: { status: { [Op.ne]: "deleted" }, mobile: reqBody.mobile },
    });
    if (checkUserId) throw StatusError.badRequest(res.__("This User Id is already registered"));
    // check duplicate user exists by given email
    const isExists = await userService.getByEmail(reqBody.email);
    if (isExists) throw StatusError.badRequest(res.__("This email is already registered"));
    if (checkMobile) throw StatusError.badRequest(res.__("This mobile is already registered"));
    if (reqBody.referrer_id != null) {
      const checkUserrefID = await model.db.user.findOne({
        where: { status: { [Op.ne]: "deleted" }, referral_id: reqBody.referrer_id },
      });
      if (!checkUserrefID) throw StatusError.badRequest(res.__("This ref ID is not valid"));
    }
    if (reqBody.bank_code != null) {
      const checkBranchCode = await model.db.bankList.findOne({
        where: { status: { [Op.ne]: "deleted" }, bank_code: reqBody.bank_code },
      });
      if (!checkBranchCode) throw StatusError.badRequest(res.__("This bank type is not valid"));
    }

    // prepare data for insertion
    const data = {
      uuid: uuidv4(),
      user_name: reqBody.user_name,
      password: await bcrypt.hash(reqBody.password, envs.passwordSalt),
      name: reqBody.name,
      email: reqBody.email,
      gender: reqBody.gender,
      dob: reqBody.dob,
      nationality: reqBody.nationality,
      mobile: reqBody.mobile,
      mobile_carrier: reqBody.mobile_carrier,
      bank_code: reqBody.bank_code,
      user_type: "user",
      bank_account_number: reqBody.bank_account_number,
      zip_code: reqBody.zip_code,
      address: reqBody.address,
      register_from: reqBody.register_from,
      acquisition_channel: reqBody.acquisition_channel,
      ip_address: req.ip,
      referral_id: reqBody.user_name,
      created_at: await customDateTimeHelper.getCurrentDateTime(),
    };

    const result = await model.db.user.create(data);
    if (result && result.id > 0) {
      const updateData = {
        created_by: result.id,
      };
      await model.db.user.update(updateData, {
        where: {
          id: result.id,
        },
      });
      const updateDataForAdditionInfo = {
        user_id: result.id,
        register_from: reqBody.register_from,
        acquisition_channel: reqBody.acquisition_channel,
        marital_status: reqBody.marital_status,
        house_wife: reqBody.house_wife,
        furniture: reqBody.furniture,
        household_income: reqBody.household_income,
        housing_type: reqBody.housing_type,
        form_of_home_ownership: reqBody.form_of_home_ownership,
        dwelling_house_size: reqBody.dwelling_house_size,
        last_degree: reqBody.last_degree,
        job: reqBody.job,
        cell_phone_type: reqBody.cell_phone_type,
        cell_phone_manufacturer: reqBody.cell_phone_manufacturer,
        telecommunication_carrier: reqBody.telecommunication_carrier,
        vehicle_possession: reqBody.vehicle_possession,
        vehicle_type: reqBody.vehicle_type,
        vehicle_brand: reqBody.vehicle_brand,
        vehicle_class: reqBody.vehicle_class,
        smoking: reqBody.smoking,
        drinking: reqBody.drinking,
        sport_on_regular_basis: reqBody.sport_on_regular_basis,
        hobby: reqBody.hobby,
        referrer_id: reqBody.referrer_id,
        created_by: result.id,
        created_at: await customDateTimeHelper.getCurrentDateTime(),
        ci: reqBody.CI,
        di: reqBody.DI,
      };

      await model.db.userAdditionalInfo.create(updateDataForAdditionInfo);
      if (reqBody.home_appliances && reqBody.home_appliances.length > 0) {
        for (const applianceId of reqBody.home_appliances) {
          if (applianceId) {
            const checkOld = await model.db.userHomeAppliances.findOne({
              where: {
                user_id: result.id,
                appliance_id: applianceId,
                status: { [Op.ne]: "deleted" },
              },
            });

            if (!checkOld) {
              const updateDataForuserHomeAppliances = {
                user_id: result.id,
                appliance_id: applianceId,
                created_by: result.id,
                created_at: await customDateTimeHelper.getCurrentDateTime(),
              };

              await model.db.userHomeAppliances.create(updateDataForuserHomeAppliances);
            } else {
              await model.db.userHomeAppliances.update(
                {
                  status: "active",
                  updated_at: await customDateTimeHelper.getCurrentDateTime(),
                  updated_by: result.id,
                },
                {
                  where: {
                    id: checkOld.id,
                  },
                },
              );
            }
          }
        }
      }
      await pointsService.updatePoints(
        result,
        reqBody.referrer_id ? reqBody.referrer_id : null,
        "signedUp",
        null,
      );
      res.ok({
        message: res.__("Registration successfully"),
      });
    } else {
      throw StatusError.badRequest(res.__("serverError"));
    }
  } catch (error) {
    next(error);
  }
};
