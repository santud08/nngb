import { celebrate, Joi } from "celebrate";

export const businessList = celebrate({
  body: Joi.object({
    page: Joi.number().optional().allow(""),
    limit: Joi.number().optional().allow(""),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().optional().allow("", "asc", "desc"),
    search_params: Joi.object({
      business_title: Joi.string().allow("").optional(),
      business_id: Joi.number().allow("").optional(),
      btype: Joi.number().allow("").optional(),
      general_survey: Joi.string().allow("", "general", "survey").optional(),
    }),
  }),
});
