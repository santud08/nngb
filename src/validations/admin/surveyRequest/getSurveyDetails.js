import { celebrate, Joi } from "celebrate";

export const getSurveyDetails = celebrate({
  params: Joi.object({
    id: Joi.number().required(),
  }),
});
