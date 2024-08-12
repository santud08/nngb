import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const saveCustomer = celebrate({
  body: Joi.object({
    representative_name: Joi.string().required().allow("", null),
    type: Joi.string().valid("corporation", "individual").required(),
    company_registration_no: Joi.string().when("type", {
      is: "corporation",
      then: Joi.string().required(),
      otherwise: Joi.string().allow("").allow(null).optional(),
    }),
    cell_phone_no: Joi.string().when("type", {
      is: "individual",
      then: Joi.string()
        // .custom((value) => {
        //   const validateRes = validationHelper.validateMobileNumber(value);
        //   if (validateRes === true) {
        //     return value;
        //   } else {
        //     throw new Error(`${validateRes}`);
        //   }
        // })
        .min(10)
        .max(11)
        .required(),
      otherwise: Joi.string().allow("").allow(null).optional(),
    }),
    company_name: Joi.string().required(),
    is_bu: Joi.string().valid("y", "n").required(),
    zip_code: Joi.string().required().allow("", null),
    address: Joi.string().required().allow("", null),
    detailed_address: Joi.string().required().allow("", null),
    phone_no: Joi.string().when("type", {
      is: "corporation",
      then: Joi.string()
        // .custom((value) => {
        //   const validateRes = validationHelper.validatePhoneNumber(value);
        //   if (validateRes === true) {
        //     return value;
        //   } else {
        //     throw new Error(`${validateRes}`);
        //   }
        // })
        .min(10)
        .max(11)
        .required(),
      otherwise: Joi.string()
        // .custom((value) => {
        //   const validateRes = validationHelper.validatePhoneNumber(value);
        //   if (validateRes === true) {
        //     return value;
        //   } else {
        //     throw new Error(`${validateRes}`);
        //   }
        // })
        .min(10)
        .max(11)
        .allow("")
        .allow(null)
        .optional(),
    }),
    contact_phone_no: Joi.string()
      // .custom((value) => {
      //   const validateRes = validationHelper.validateMobileNumber(value);
      //   if (validateRes === true) {
      //     return value;
      //   } else {
      //     throw new Error(`${validateRes}`);
      //   }
      // })
      .min(10)
      .max(11)
      .allow("")
      .allow(null)
      .optional(),
    registration_date: Joi.string().isoDate().required().allow("", null),
    vendor_type: Joi.array()
      .items(Joi.string().valid("vendor", "customer", "external_panel", "affiliate"))
      .min(1)
      .required()
      .custom((value) => {
        const validateRes = value.includes("affiliate");
        if (validateRes && value.length > 1) {
          throw new Error("Cannot include other type with affiliate");
        }
        return value;
      }),
    files: {
      business_registration_file: Joi.object().allow("", null).optional(),
      copy_of_bank_book_file: Joi.object().allow("", null).optional(),
    },
  }),
});
