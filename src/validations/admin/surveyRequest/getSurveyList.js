import { celebrate, Joi } from "celebrate";

export const getSurveyList = celebrate({
  body: Joi.object({
    page: Joi.number().optional().allow(""),
    limit: Joi.number().optional().allow(""),
    sort_by: Joi.string().optional().allow("", "id"),
    sort_order: Joi.string().optional().allow("", "asc", "desc"),
    search_params: Joi.object({
      survey_methods: Joi.string().allow("").optional(),
      inquirer_name: Joi.string().allow("").optional(),
      investigation_start_date: Joi.date().iso().allow("").optional(),
      investigation_end_date: Joi.date().iso().allow("").optional(),
      status: Joi.string().allow("").valid("active", "inactive").optional(),
    }).required(),
  }),
});
