import { celebrate, Joi } from "celebrate";

export const getLevelOneIndustryList = celebrate({
  body: Joi.object({
    page: Joi.number().optional().allow(""),
    limit: Joi.number().optional().allow(""),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().optional().allow("", "asc", "desc"),
    search_params: Joi.object({
      industry_name: Joi.string().allow("").optional(),
      start_date: Joi.date().iso().allow("").optional(),
      end_date: Joi.date().iso().allow("").optional(),
    }).required(),
  }),
});
