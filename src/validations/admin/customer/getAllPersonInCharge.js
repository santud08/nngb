import { celebrate, Joi } from "celebrate";

export const getAllPersonInCharge = celebrate({
  body: Joi.object({
    customer_id: Joi.number().required(),
    page: Joi.number().optional().allow(""),
    limit: Joi.number().optional().allow(""),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().optional().allow("", "asc", "desc"),
  }),
});
