import { celebrate, Joi } from "celebrate";

export const cashDetails = celebrate({
  body: Joi.object({
    page: Joi.number().optional().allow(""),
    limit: Joi.number().optional().allow(""),
    sort_by: Joi.string().optional().allow("", "reg_date"),
    sort_order: Joi.string().optional().allow("", "asc", "desc"),
    is_first: Joi.string().optional().allow("", "y", "n"),
    search_params: Joi.object({
      date: Joi.string().allow("").required(),
      year: Joi.number().allow("").required(),
      search_title: Joi.string().allow("").required(),
    }).optional(),
  }),
});
