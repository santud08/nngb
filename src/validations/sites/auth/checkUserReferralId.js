import { celebrate, Joi } from "celebrate";
export const checkUserReferralId = celebrate({
  body: Joi.object({
    referral_id: Joi.string().required().min(5).max(12),
  }),
});
