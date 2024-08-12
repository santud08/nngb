import { celebrate, Joi } from "celebrate";

export const deleteProductCategory = celebrate({
  body: Joi.object({
    id: Joi.number().required(),
  }),
});
