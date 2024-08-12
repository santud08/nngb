import { celebrate, Joi } from "celebrate";

export const productCategoryDetails = celebrate({
  params: Joi.object({
    id: Joi.number().required(),
  }),
});
