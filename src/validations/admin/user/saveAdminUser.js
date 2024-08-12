import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const saveAdminUser = celebrate({
  body: Joi.object({
    user_type: Joi.string().valid("manager", "vendor").required(),
    department_id: Joi.number().required(),
    user_name: Joi.string().alphanum().min(3).max(30).required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
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
    mobile: Joi.string()
      //.pattern(new RegExp("^[0-9]{10}$"))
      .min(10)
      .max(11)
      .required()
      .messages({
        "string.min": "정확한 번호를 입력해주세요",
        "string.max": "정확한 번호를 입력해주세요",
      }),
    phone: Joi.string()
      //.pattern(new RegExp("^[0-9]{10}$"))
      .min(10)
      .max(11)
      .allow("")
      .allow(null)
      .optional()
      .messages({
        "string.min": "정확한 번호를 입력해주세요",
        "string.max": "정확한 번호를 입력해주세요",
      }),
    bu_id: Joi.number().allow("").allow(null).optional(),
    team_id: Joi.number().allow("").allow(null).optional(),
    headquarter_id: Joi.number().allow("").allow(null).optional(),
    rank: Joi.string().allow("").allow(null).optional(),
    note: Joi.string().allow("").allow(null).optional(),
    status: Joi.string().valid("active", "inactive").required(),
    user_access: Joi.array().items(Joi.number()).min(1).required(),
    user_ip_access: Joi.array().items(Joi.string().ip()).min(1).required(),
  }),
});
