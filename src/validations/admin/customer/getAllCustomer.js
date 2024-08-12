import { celebrate, Joi } from "celebrate";

export const getAllCustomer = celebrate({
  body: Joi.object({
    page: Joi.number().optional().allow(""),
    limit: Joi.number().optional().allow(""),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().optional().allow("", "asc", "desc"),
    search_params: Joi.object({
      company_name: Joi.string().allow("").required(),
      vendor_type: Joi.array().items(Joi.string().optional()).empty().required(),
      vendor_id: Joi.string().allow("").required(),
    }).required(),
  }),
});
