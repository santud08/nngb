import { celebrate, Joi } from "celebrate";

export const socialLogin = celebrate({
  body: Joi.object({
    email: Joi.string().required().email(),
    acquisition_channel: Joi.string().optional(),
    login_from: Joi.string().required().valid("naver", "kakao", "google"),
  }),
});
