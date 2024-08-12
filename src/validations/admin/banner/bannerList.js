import { celebrate, Joi } from "celebrate";

export const bannerList = celebrate({
  body: Joi.object({
    page: Joi.number().optional().allow(""),
    limit: Joi.number().optional().allow(""),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().optional().allow("", "asc", "desc"),
    search_params: Joi.object({
      acquisition_channel: Joi.string().required().valid("netpoint", "smart_panel"),
      banner_name: Joi.string().allow("").optional(),
      start_date: Joi.date().allow("").optional(),
      end_date: Joi.date().allow("").optional(),
      is_exposed: Joi.string().allow("", "true", "false").optional(),
    }),
  }),
});
