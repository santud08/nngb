import { celebrate, Joi } from "celebrate";

export const deleteIndustry = celebrate({
  body: Joi.object({
    id: Joi.number().required(),
  }),
});
