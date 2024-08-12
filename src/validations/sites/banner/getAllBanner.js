import { celebrate, Joi } from "celebrate";

export const getAllBanner = celebrate({
  body: Joi.object({
    page: Joi.number().optional().allow(""),
    limit: Joi.number().optional().allow(""),
    sort_by: Joi.string().optional().allow(""),
    sort_order: Joi.string().allow("asc", "desc"),
    panel: Joi.string().valid("smart_panel", "netpoint", "").optional(),
  }),
});
