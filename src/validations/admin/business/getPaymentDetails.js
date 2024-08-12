import { celebrate, Joi } from "celebrate";

export const businessPaymentDetails = celebrate({
  params: Joi.object({
    businessId: Joi.number().required(),
  }),
});
