import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";
export const updateConversionRestrictionInfo = celebrate({
  body: Joi.object({
    id: Joi.number().required(),
    business_id: Joi.number().required(),
    required_least_cache: Joi.number().required(),
    required_min_unit_cache: Joi.number().required(),
    limited_max_cache: Joi.number().optional(),
    limited_unit: Joi.when("limited_max_cache", {
      is: Joi.exist(),
      then: Joi.string().valid("pc", "pd", "pm", "pw").required(),
      otherwise: Joi.string().valid("pc", "pd", "pm", "pw").allow("").optional(),
    })
      .required()
      .external(async (value, helpers) => {
        const validateRes = await validationHelper.limitPeriodUnit(value);
        if (validateRes === true) {
          return value;
        } else {
          return helpers.message(`${validateRes}`);
        }
      }),
    limited_ncash: Joi.when("limited_max_cache", {
      is: Joi.exist(),
      then: Joi.number().required(),
      otherwise: Joi.number().optional(),
    }),
  }),
});
