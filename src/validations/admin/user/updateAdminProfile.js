import { celebrate, Joi } from "celebrate";

export const updateAdminProfile = celebrate({
  body: Joi.object({
    email: Joi.string()
      .required()
      .email()
      .messages({ "string.email": "이메일을 올바르게 입력해주세요" }),
    mobile: Joi.string().required().min(10).max(11),
    phone: Joi.string().required().min(10).max(11),
  }),
});
