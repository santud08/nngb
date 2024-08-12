import { celebrate, Joi } from "celebrate";

export const addStepTwoIndustry = celebrate({
  body: Joi.object({
    industry_name: Joi.string().required(),
    industry_step: Joi.string().required().valid("level_1", "step_2"),
    parent_id: Joi.number().required(),
  }),
});
