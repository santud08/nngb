import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";
export const userSignup = celebrate({
  body: Joi.object({
    user_name: Joi.string()
      .required()
      .min(5)
      .max(12)
      .custom((value) => {
        const validateRes = validationHelper.validateUserID(value);
        if (validateRes === true) {
          return value;
        } else {
          throw new Error(`${validateRes}`);
        }
      }),
    password: Joi.string()
      .required()
      .min(8)
      .max(16)
      .custom((value) => {
        const validateRes = validationHelper.adminPasswordRule(value);
        if (validateRes === true) {
          return value;
        } else {
          throw new Error(`${validateRes}`);
        }
      }),
    email: Joi.string()
      .required()
      .email()
      .messages({ "string.email": "이메일을 올바르게 입력해주세요" }),
    mobile: Joi.string().required().min(10).max(11),
    name: Joi.string()
      .required()
      .custom((value) => {
        const validateRes = validationHelper.validateUserName(value);
        if (validateRes === true) {
          return value;
        } else {
          throw new Error(`${validateRes}`);
        }
      }),
    // profile_image: Joi.string(),
    user_type: Joi.string().valid("user", "admin", "super_admin"),
    gender: Joi.string().required().valid("male", "female"),
    dob: Joi.string().required(),
    nationality: Joi.string().required().valid("local", "foreigner"),
    mobile_carrier: Joi.string()
      .required()
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.mobileCarrier(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),
    bank_code: Joi.string().required(),
    bank_account_number: Joi.string().required(),
    zip_code: Joi.string().required(),
    address: Joi.string().required(),
    register_from: Joi.string().required().valid("naver", "kakao", "google").allow(null, ""),
    acquisition_channel: Joi.string().required().valid("smart_panel", "netpoint"),
    marital_status: Joi.string()
      .required()
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.maritalStatus(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),

    house_wife: Joi.string().external(async (value, helpers) => {
      const validateRes = await validationHelper.houseWife(value);
      if (validateRes === true) {
        return value;
      } else {
        return helpers.message(`${validateRes}`);
      }
    }),
    furniture: Joi.string()
      .required()
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.furniture(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),
    household_income: Joi.string()
      .required()
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.householdIncome(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),
    housing_type: Joi.string()
      .required()
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.housingType(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),
    form_of_home_ownership: Joi.string()
      .required()
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.homeOwnership(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),
    dwelling_house_size: Joi.string()
      .required()
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.dwellingHouseSize(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),
    last_degree: Joi.string()
      .required()
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.lastDegree(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),
    job: Joi.string()
      .required()
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.jobs(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),
    cell_phone_type: Joi.string()
      .required()
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.cellPhoneType(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),
    cell_phone_manufacturer: Joi.string()
      .when("cell_phone_type", {
        is: "dump",
        then: Joi.string().optional().allow(""),
        otherwise: Joi.string().required().messages({
          "any.required": "Cell phone manufacturer is required",
          "string.empty": "Cell phone manufacturer must not be empty",
        }),
      })
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.cellPhoneManufacturer(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),

    telecommunication_carrier: Joi.string()
      .when("cell_phone_type", {
        is: "dump",
        then: Joi.string().optional().allow(""),
        otherwise: Joi.string().required().messages({
          "any.required": "Telecommunication carrier is required",
          "string.empty": "Telecommunication carrier must not be empty",
        }),
      })
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.teleCommunicationCarrier(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),
    vehicle_possession: Joi.string()
      .required()
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.vehiclePossession(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),
    vehicle_type: Joi.string()
      .when("vehicle_possession", {
        is: "no",
        then: Joi.string().optional().allow(""),
        otherwise: Joi.string().required().messages({
          "any.required": "Vehicle possession is required",
          "string.empty": "Vehicle possession carrier must not be empty",
        }),
      })
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.vehicleType(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),

    vehicle_brand: Joi.string()
      .when("vehicle_possession", {
        is: "no",
        then: Joi.string().optional().allow(""),
        otherwise: Joi.string().required().messages({
          "any.required": "Vehicle brand is required",
          "string.empty": "Vehicle brand carrier must not be empty",
        }),
      })
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.vehicleBrands(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),

    vehicle_class: Joi.string()
      .when("vehicle_possession", {
        is: "no",
        then: Joi.string().optional().allow(""),
        otherwise: Joi.string().required().messages({
          "any.required": "Vehicle class is required",
          "string.empty": "Vehicle class carrier must not be empty",
        }),
      })
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.vehicleClass(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),
    smoking: Joi.string()
      .optional()
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.smoking(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),
    drinking: Joi.string()
      .optional()
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.drinking(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),

    sport_on_regular_basis: Joi.number().required(),
    hobby: Joi.number().optional(),
    referrer_id: Joi.string().allow(null),
    CI: Joi.string().required(),
    DI: Joi.string().required(),
    home_appliances: Joi.array().items(Joi.number()).min(1).required(),
    ip_address: Joi.string().optional().allow(null),
  }),
});
