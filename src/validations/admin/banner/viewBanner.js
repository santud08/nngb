import { celebrate, Joi } from "celebrate";

export const viewBanner = celebrate({
  params: Joi.object({
    id: Joi.number().required(),
  }),
});
