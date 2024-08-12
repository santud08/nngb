import { celebrate, Joi } from "celebrate";

export const updateLevelOne = celebrate({
  body: Joi.object({
    id: Joi.number().required(),
    industry_name: Joi.string().required(),
  }),
});
