import { celebrate, Joi } from "celebrate";

export const productListsByCategory = celebrate({
  body: Joi.object({
    category_id: Joi.number().required(),
    page: Joi.number().optional().allow(""),
    limit: Joi.number().optional().allow(""),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().optional().allow("", "asc", "desc"),
    search_params: Joi.object({
      category_name: Joi.string().allow("").optional(),
      product_name: Joi.string().allow("").optional(),
      status: Joi.string().valid("active", "inactive", "").optional(),
      reg_start_date: Joi.date().allow("").iso().optional(),
      reg_end_date: Joi.date().allow("").iso().optional(),
    }),
  }),
});
