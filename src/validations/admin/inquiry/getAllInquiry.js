import { celebrate, Joi } from "celebrate";

export const getAllInquiry = celebrate({
  body: Joi.object({
    page: Joi.number().optional().allow(""),
    limit: Joi.number().optional().allow(""),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().optional().allow("", "asc", "desc"),
    search_params: Joi.object({
      inquiry_title: Joi.string().allow("").optional(),
      inquirer_id: Joi.string().allow("").optional(),
      inquirer_email: Joi.string().email().allow("").optional(),
      inquiry_category_id: Joi.number().allow("").optional(),
      inquiry_start_date: Joi.date().iso().allow("").optional(),
      inquiry_end_date: Joi.date().iso().allow("").optional(),
      status: Joi.string().allow("", "pending", "answared").optional(),
      ans_start_date: Joi.date().iso().allow("").optional(),
      ans_end_date: Joi.date().iso().allow("").optional(),
    }).required(),
  }),
});
