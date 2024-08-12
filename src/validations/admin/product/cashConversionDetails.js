import { celebrate, Joi } from "celebrate";

export const cashConversionDetails = celebrate({
  params: Joi.object({
    id: Joi.number().required(),
  }),
});
