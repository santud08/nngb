import { celebrate, Joi } from "celebrate";

export const productDetails = celebrate({
  params: Joi.object({
    id: Joi.number().required(),
  }),
});
