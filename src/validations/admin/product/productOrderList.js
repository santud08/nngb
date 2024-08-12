import { celebrate, Joi } from "celebrate";

export const productOrderList = celebrate({
  body: Joi.object({
    product_id: Joi.number().required(),
    page: Joi.number().optional().allow(""),
    limit: Joi.number().optional().allow(""),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().optional().allow("", "asc", "desc"),
    search_params: Joi.object({
      ucode: Joi.number().allow("").optional(),
      name: Joi.string().allow("").optional(),
      user_id: Joi.string().allow("").optional(),
      request_start_date: Joi.date().allow("").iso().optional(),
      request_end_date: Joi.date().allow("").iso().optional(),
      approval_start_date: Joi.date().allow("").iso().optional(),
      approval_end_date: Joi.date().allow("").iso().optional(),
      current_status: Joi.array().allow("", "completed", "refuse").optional(),
    }),
  }),
});
