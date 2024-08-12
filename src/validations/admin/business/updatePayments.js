import { celebrate, Joi } from "celebrate";

export const updateBusinessPayments = celebrate({
  body: Joi.object({
    payment_id: Joi.number().required(),
    transac_amount: Joi.number().required(),
  }),
});
