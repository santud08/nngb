import { celebrate, Joi } from "celebrate";
export const memberList = celebrate({
  body: Joi.object({
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().valid("", "asc", "desc").optional(),
    search_params: Joi.object({
      gender: Joi.string().valid("", "female", "male").optional(),
      min_age: Joi.number().min(1).optional().allow(""),
      max_age: Joi.number().min(1).optional().allow(""),
      marital_status: Joi.string().optional().allow(""),
      regions: Joi.array().items(Joi.string()).optional(),
      jobs: Joi.array().items(Joi.string()).optional(),
      degrees: Joi.array().items(Joi.string()).optional(),
      date: Joi.date().iso().optional(),
    }),
  }),
});
