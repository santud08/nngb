import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const createCustomerCredential = celebrate({
  body: Joi.object({
    customer_id: Joi.number().required(),
    user_name: Joi.string().required(),
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
  }),
});
