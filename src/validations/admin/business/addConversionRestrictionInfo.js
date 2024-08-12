import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const addConversionRestrictionInfo = celebrate({
  body: Joi.object({
    business_id: Joi.number().required(),
    required_least_cache: Joi.number().required(),
    required_min_unit_cache: Joi.number().required(),
    limited_max_cache: Joi.number().optional(),
    limited_unit: Joi.string()
      .when("limited_max_cache", {
        is: Joi.exist(),
        then: Joi.valid("pc", "pd", "pm", "pw").required(),
        otherwise: Joi.valid("pc", "pd", "pm", "pw").allow(null).optional(),
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
