import { celebrate, Joi } from "celebrate";

export const viewFaq = celebrate({
  params: Joi.object({
    id: Joi.number().required(),
  }),
});
