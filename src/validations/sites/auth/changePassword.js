import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";
export const changePassword = celebrate({
  body: Joi.object({
    user_id: Joi.number().required(),
    password: Joi.string().required().min(8).max(16),
    new_password: Joi.string()
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
  }),
});
