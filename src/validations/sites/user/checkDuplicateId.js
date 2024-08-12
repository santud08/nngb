import { celebrate, Joi } from "celebrate";

export const checkDuplicateId = celebrate({
  body: Joi.object({
    user_name: Joi.string().required().min(5).max(12),
    user_id: Joi.string().optional().allow("", null),
  }),
});
