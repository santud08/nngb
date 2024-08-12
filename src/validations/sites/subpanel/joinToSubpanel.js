import { celebrate, Joi } from "celebrate";

export const joinToSubpanel = celebrate({
  body: Joi.object({
    subpanel_id: Joi.number().required(),
    answers: Joi.array()
      .items(
        Joi.object({
          question_id: Joi.number().required(),
          option_id: Joi.number().allow(null).required(),
          comment: Joi.string().allow(null).required(),
        }),
      )
      .min(1)
      .required(),
  }),
});
