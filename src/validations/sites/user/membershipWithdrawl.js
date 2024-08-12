import { celebrate, Joi } from "celebrate";
export const membershipWithdrawl = celebrate({
  body: Joi.object({
    user_name: Joi.string().required(),
    status: Joi.string().valid("withdrawal").required(),
  }),
});
