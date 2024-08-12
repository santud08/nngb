import { celebrate, Joi } from "celebrate";

export const deleteProduct = celebrate({
  body: Joi.object({
    product_ids: Joi.array().required(),
  }),
});
