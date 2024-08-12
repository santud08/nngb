import { celebrate, Joi } from "celebrate";

export const viewSubpanel = celebrate({
  params: Joi.object({
    id: Joi.number().required(),
  }),
});
