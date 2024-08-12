import { celebrate, Joi } from "celebrate";

export const checkEmail = celebrate({
  body: Joi.object({
    email: Joi.string().required().email().messages({
      "string.email": "이메일을 올바르게 입력해주세요",
    }),
    user_id: Joi.string().optional().allow("", null),
  }),
});
