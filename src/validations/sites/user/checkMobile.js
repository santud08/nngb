import { celebrate, Joi } from "celebrate";

export const checkMobile = celebrate({
  body: Joi.object({
    mobile: Joi.number().required(),
    user_id: Joi.string().optional().allow("", null),
  }),
});
