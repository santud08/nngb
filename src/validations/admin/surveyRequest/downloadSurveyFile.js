import { celebrate, Joi } from "celebrate";

export const downloadSurveyFile = celebrate({
  body: Joi.object({
    file_id: Joi.number().required(),
    survey_id: Joi.number().required(),
  }),
});
