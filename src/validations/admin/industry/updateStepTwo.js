import { celebrate, Joi } from "celebrate";

export const updateStepTwo = celebrate({
  body: Joi.object({
    id: Joi.number().required(),
    industry_name: Joi.string().required(),
  }),
});
