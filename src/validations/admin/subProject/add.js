import { celebrate, Joi } from "celebrate";

export const addSubProject = celebrate({
  body: Joi.object({
    project_id: Joi.number().required(),
    sub_project_name: Joi.string().required(),
    contact_person_id: Joi.number().required(),
    sub_project_progress_id: Joi.number().required(),
    investigation_method_id: Joi.number().required(),
    development_difficulty: Joi.string().valid("image", "center", "work").optional(),
    no_of_samples: Joi.number().required(),
    business_id: Joi.number().required(),
    sample_unit_pice: Joi.number().required(),
    additional_amount: Joi.number().required(),
    discount_amount: Joi.number().required(),
    files: {
      file_upload: Joi.object().allow("", null).optional(),
    },
    project_schedule: Joi.array()
      .items(
        Joi.object({
          sub_project_steps_id: Joi.number().required(),
          start_date: Joi.string().required(),
          end_date: Joi.string().required(),
        }),
      )
      .min(1)
      .required(),
    gender: Joi.string().valid("female", "other").required(),
    min_age: Joi.number().required(),
    max_age: Joi.number().required(),
    note: Joi.string().required(),
    region: Joi.array().items(Joi.number().required()).required(),
    hashtag: Joi.array().items(Joi.string().required()).required(),
  }),
});
