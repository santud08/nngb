import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const externalAdminUserList = celebrate({
  body: Joi.object({
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().valid("", "asc", "desc").optional(),
    search_params: Joi.object({
      customer_ids: Joi.array().items(Joi.number().integer()).optional(),
      code: Joi.string().optional().allow(""),
      name: Joi.string().optional().allow(""),
      bu_id: Joi.number().optional().allow(""),
      rank: Joi.string().optional().allow(""),
      headquarter_id: Joi.number().optional().allow(""),
      team_id: Joi.number().optional().allow(""),
      email: Joi.string().optional().email().allow(""),
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
        .allow("")
        .optional(),
    }),
  }),
});
