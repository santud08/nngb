import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const updateExternalAdminUser = celebrate({
  body: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    bu_id: Joi.string().required(),
    rank: Joi.string().required(),
    headquarter_id: Joi.string().required(),
    email: Joi.string().email().required(),
    team_id: Joi.string().required(),
    contact: Joi.string()
      .custom((value) => {
        const validateRes = validationHelper.validateMobileNumber(value);
        if (validateRes === true) {
          return value;
        } else {
          throw new Error(`${validateRes}`);
        }
      })
      .min(10)
      .max(11)
      .required(),
  }),
});
