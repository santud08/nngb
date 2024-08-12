import { celebrate, Joi } from "celebrate";
export const varifyPassword = celebrate({
  body: Joi.object({
    password: Joi.string().required().min(8).max(16),
  }),
});
