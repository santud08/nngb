import { celebrate, Joi } from "celebrate";

export const conversionSettingAfterRegistration = celebrate({
  body: Joi.object({
    business_id: Joi.number().required(),
    customer_id: Joi.number().required(),
  }),
});
