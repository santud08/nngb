import { celebrate, Joi } from "celebrate";

export const affiliateListExcelDownload = celebrate({
  body: Joi.object({
    vendor_id: Joi.number().required(),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().optional().allow("", "asc", "desc"),
    search_params: Joi.object({
      transaction_id: Joi.string().allow("").optional(),
      ucode: Joi.string().allow("").optional(),
      membership_value: Joi.number().allow("").optional(),
      reg_start_date: Joi.date().allow("").iso().optional(),
      reg_end_date: Joi.date().allow("").iso().optional(),
      current_status: Joi.array().allow("", "completed", "refuse").optional(),
    }),
  }),
});
