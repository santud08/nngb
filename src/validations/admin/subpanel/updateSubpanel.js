import { celebrate, Joi } from "celebrate";

export const updateSubpanel = celebrate({
  body: Joi.object({
    id: Joi.number().required(),
    subpanel_title: Joi.string().required(),
    status: Joi.string().valid("active", "inactive").required(),
    subpanel_questions: Joi.array()
      .items(
        Joi.object({
          id: Joi.number().allow(null).optional(),
          subpanel_question: Joi.string().required(),
          question_type: Joi.string()
            .valid("single_option_answer", "multiple_option_answer", "short_description")
            .required(),
          subpanel_question_options: Joi.when("question_type", {
            is: "single_option_answer",
            then: Joi.array()
              .items(
                Joi.object({
                  id: Joi.number().allow(null).optional(),
                  option_title: Joi.string().required(),
                }),
              )
              .min(2)
              .required(),
            otherwise: Joi.when("question_type", {
              is: "multiple_option_answer",
              then: Joi.array()
                .items(
                  Joi.object({
                    id: Joi.number().allow(null).optional(),
                    option_title: Joi.string().required(),
                  }),
                )
                .min(2)
                .required(),
              otherwise: Joi.array().empty().required(),
            }),
          }),
        }),
      )
      .min(1)
      .required(),
  }),
});
