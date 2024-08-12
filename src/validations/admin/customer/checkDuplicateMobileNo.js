import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const checkDuplicateMobileNo = celebrate({
  query: Joi.object({
    mobile_no: Joi.string()
      .min(10)
      .max(11)
      .required()
      .custom((value) => {
        const validateRes = validationHelper.validateMobileNumber(value);
        if (validateRes === true) {
          return value;
        } else {
          throw new Error(`${validateRes}`);
        }
      }),
    customer_id: Joi.string().optional().allow("", null),
  }),
});
