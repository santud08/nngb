import { celebrate, Joi } from "celebrate";
export const adminLoginExIp = celebrate({
  body: Joi.object({
    user_name: Joi.string().required(),
    password: Joi.string().required(),
    user_type: Joi.string().required().allow("", "vendor"),
    phone: Joi.string().required(),
  }),
});
