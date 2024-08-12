import { celebrate, Joi } from "celebrate";

export const faqList = celebrate({
  body: Joi.object({
    page: Joi.number().optional().allow(""),
    limit: Joi.number().optional().allow(""),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().optional().allow("", "asc", "desc"),
    search_params: Joi.object({
      faq_category_id: Joi.number().allow("").optional(),
      faq_title: Joi.string().allow("").optional(),
      start_date: Joi.date().allow("").optional(),
      end_date: Joi.date().allow("").optional(),
      is_exposed: Joi.string().allow("").optional(),
    }),
  }),
});
