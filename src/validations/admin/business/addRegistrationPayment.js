import { celebrate, Joi } from "celebrate";

export const addRegistrationPayment = celebrate({
  body: Joi.object({
    business_id: Joi.number().required(),
    collateral_type: Joi.string().required(),
    transac_amount: Joi.number().required(),
    balance_amount: Joi.number().required(),
    registration_date: Joi.string().required(),
  }),
});
