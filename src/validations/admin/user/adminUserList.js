import { celebrate, Joi } from "celebrate";
export const adminUserList = celebrate({
  body: Joi.object({
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().valid("", "asc", "desc").optional(),
    search_params: Joi.object({
      department: Joi.number().optional().allow(""),
      name: Joi.string().optional().allow(""),
      user_name: Joi.string().optional().allow(""),
      email: Joi.string().optional().email().allow(""),
      status: Joi.string().valid("active", "inactive", "").optional(),
    }),
  }),
});
