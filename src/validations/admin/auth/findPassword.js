import { celebrate, Joi } from "celebrate";
export const findPassword = celebrate({
  body: Joi.object({
    user_id: Joi.string().required().min(5).max(12),
  }),
});
