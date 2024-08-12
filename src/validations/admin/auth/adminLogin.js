import { celebrate, Joi } from "celebrate";
export const adminLogin = celebrate({
  body: Joi.object({
    user_name: Joi.string().required(),
    password: Joi.string().required(),
    user_type: Joi.string().required().allow("", "vendor"),
    user_ip: Joi.string().required(),
  }),
});
