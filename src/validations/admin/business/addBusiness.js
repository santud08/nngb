import { celebrate, Joi } from "celebrate";

export const addBusiness = celebrate({
  body: Joi.object({
    vendor_id: Joi.number().required(),
    btype: Joi.number().required(),
    business_title: Joi.string().required(),
    status: Joi.string().valid("active", "inactive", "deleted").required(),
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    cache_fixed: Joi.string().optional(),
    duplicate_check_method_id: Joi.number().required(),
    gubun_id: Joi.number().when("duplicate_check_method_id", {
      is: Joi.number().valid(3, 4),
      then: Joi.number().required(),
      otherwise: Joi.number().optional(),
    }),
    memo: Joi.string().allow(null, "").optional(),
    write_limit_business: Joi.array().items(Joi.number().optional()).optional(),
  }),
});
