import { celebrate, Joi } from "celebrate";

export const getPaymentList = celebrate({
  body: Joi.object({
    business_id: Joi.number().required(),
    page: Joi.number().optional().allow(""),
    limit: Joi.number().optional().allow(""),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().optional().allow("", "asc", "desc"),
  }),
});
