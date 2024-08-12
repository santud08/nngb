import { celebrate, Joi } from "celebrate";

export const getSubpanels = celebrate({
  body: Joi.object({
    page: Joi.number().optional().allow(""),
    limit: Joi.number().optional().allow(""),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().optional().allow("", "asc", "desc"),
    search_params: Joi.object({
      subpanel_title: Joi.string().allow("").optional(),
      start_date: Joi.date().iso().allow("").optional(),
      end_date: Joi.date().iso().allow("").optional(),
      status: Joi.string().allow("").valid("active", "inactive").optional(),
    }).required(),
  }),
});
