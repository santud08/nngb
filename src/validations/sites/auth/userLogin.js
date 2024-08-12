import { celebrate, Joi } from "celebrate";
export const userLogin = celebrate({
  body: Joi.object({
    user_name: Joi.string().required().min(5).max(12),
    password: Joi.string().required().min(8).max(16),
    acquisition_channel: Joi.string().optional().allow(""),
  }),
});
