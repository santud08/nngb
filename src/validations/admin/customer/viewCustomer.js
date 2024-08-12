import { celebrate, Joi } from "celebrate";

export const viewCustomer = celebrate({
  params: Joi.object({
    customer_id: Joi.number().required(),
  }),
});
