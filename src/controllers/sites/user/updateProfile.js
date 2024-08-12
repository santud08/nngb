import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * updateProfile
 * User can update their profile with details
 * @param req
 * @param res
 * @param next
 */
export const updateProfile = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : null;
    if (!userId) throw StatusError.badRequest("invalidId");

    const checkUser = await model.db.user.findOne({
      where: { status: { [Op.ne]: "deleted" }, id: userId },
    });
    if (!checkUser) throw StatusError.badRequest("User not available");

    const checkMobile = await model.db.user.findOne({
      where: { status: { [Op.ne]: "deleted" }, mobile: reqBody.mobile, id: { [Op.ne]: userId } },
    });
    if (checkMobile) {
      throw StatusError.badRequest(res.__("This mobile is already registered"));
    }

    const isExists = await model.db.user.findOne({
      where: { status: { [Op.ne]: "deleted" }, email: reqBody.email, id: { [Op.ne]: userId } },
    });
    if (isExists) {
      throw StatusError.badRequest(res.__("This email is already registered"));
    }

    if (reqBody.bank_code != null) {
      const checkBranchCode = await model.db.bankList.findOne({
        where: { status: { [Op.ne]: "deleted" }, bank_code: reqBody.bank_code },
      });
      if (!checkBranchCode) throw StatusError.badRequest(res.__("This bank type is not valid"));
    }

    // prepare data for insertion
    let data = {
      email: reqBody.email,
      gender: reqBody.gender,
      nationality: reqBody.nationality,
      mobile: reqBody.mobile,
      mobile_carrier: reqBody.mobile_carrier,
      bank_code: reqBody.bank_code,
      bank_account_number: reqBody.bank_account_number,
      zip_code: reqBody.zip_code,
      address: reqBody.address,
      additional_address: reqBody.additional_address,
      updated_at: await customDateTimeHelper.getCurrentDateTime(),
      updated_by: userId,
    };
    if (reqBody.password) data.password = await bcrypt.hash(reqBody.password, envs.passwordSalt);
    const result = await model.db.user.update(data, {
      where: {
        id: userId,
      },
    });

    if (result && result[0] > 0) {
      const updateDataForAdditionInfo = {
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
        updated_at: await customDateTimeHelper.getCurrentDateTime(),
        updated_by: userId,
      };
      if (reqBody.CI) {
        updateDataForAdditionInfo.ci = reqBody.CI;
      }

      if (reqBody.DI) {
        updateDataForAdditionInfo.di = reqBody.DI;
      }
      const checkAdditional = await model.db.userAdditionalInfo.findOne({
        where: { status: { [Op.ne]: "deleted" }, user_id: userId },
      });
      if (checkAdditional) {
        await model.db.userAdditionalInfo.update(updateDataForAdditionInfo, {
          where: {
            id: checkAdditional.id,
          },
        });
      }

      if (reqBody.home_appliances && reqBody.home_appliances.length > 0) {
        await model.db.userHomeAppliances.update(
          {
            status: "deleted",
            updated_at: await customDateTimeHelper.getCurrentDateTime(),
            updated_by: userId,
          },
          {
            where: {
              user_id: userId,
            },
          },
        );
        for (const applianceId of reqBody.home_appliances) {
          if (applianceId) {
            const checkOld = await model.db.userHomeAppliances.findOne({
              where: { user_id: userId, appliance_id: applianceId },
            });

            if (!checkOld) {
              const updateDataForuserHomeAppliances = {
                user_id: userId,
                appliance_id: applianceId,
                created_by: userId,
                created_at: await customDateTimeHelper.getCurrentDateTime(),
              };

              await model.db.userHomeAppliances.create(updateDataForuserHomeAppliances);
            } else {
              await model.db.userHomeAppliances.update(
                {
                  status: "active",
                  updated_at: await customDateTimeHelper.getCurrentDateTime(),
                  updated_by: userId,
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
      let retResult = { message: res.__("Updated successfully") };
      if (reqBody.email != req.userDetails.email) {
        const result = await userService.generateTokens(
          reqBody.email,
          req.userDetails.login_acquisition_channel,
        );

        retResult.results = {
          token: result.access_token,
          token_expiry: result.access_token_expiry,
        };
      }

      res.ok(retResult);
    } else {
      throw StatusError.badRequest(res.__("serverError"));
    }
  } catch (error) {
    next(error);
  }
};
