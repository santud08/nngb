import { celebrate, Joi } from "celebrate";

export const surveyInformationDetails = celebrate({
  query: Joi.object({
    business_id: Joi.number().required(),
  }),
});
