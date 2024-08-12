import { celebrate, Joi } from "celebrate";
export const findPassword = celebrate({
  body: Joi.object({
    user_name: Joi.string().required().min(5).max(12),
    mobile: Joi.string().required().min(10).max(11),
  }),
});
