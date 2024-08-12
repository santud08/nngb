import { celebrate, Joi } from "celebrate";

export const businessDetails = celebrate({
  params: Joi.object({
    id: Joi.number().required(),
  }),
});
