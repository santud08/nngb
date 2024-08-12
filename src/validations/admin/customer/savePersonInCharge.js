import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const savePersonInCharge = celebrate({
  body: Joi.object({
    customer_id: Joi.string().required(),
    person_type: Joi.string().valid("interior", "outside").required(),
    contact_person_id: Joi.number().allow("").optional(),
    code: Joi.string().allow("").allow(null).optional(),
    person_name: Joi.string().required(),
    bu_id: Joi.string().required(),
    rank: Joi.string().allow("").allow(null).optional(),
    headquarters_id: Joi.string().required(),
    email: Joi.string().email().required(),
    team_id: Joi.string().required(),
    contact_no: Joi.string()
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
    note: Joi.string().allow("").allow(null).optional(),
  }),
});
