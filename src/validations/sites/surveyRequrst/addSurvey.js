import { celebrate, Joi } from "celebrate";
//import { validationHelper } from "../../../helpers/index.js";

export const addSurvey = celebrate({
  body: Joi.object({
    survey_method: Joi.array()
      .items(Joi.string().valid("online_survey_creation", "panel_rental", "etc"))
      .required(),
    // survey_method: Joi.array()
    //   .required()
    //   .custom((value) => {
    //     const objKeys = {
    //       dataType: "string",
    //       option: "required",
    //       validValues: ["online_survey_creation", "panel_rental", "etc"],
    //     };

    //     const validateRes = validationHelper.arrayValueValidate(value, objKeys);
    //     if (validateRes === true) {
    //       return value;
    //     } else {
    //       throw new Error(`${validateRes}`);
    //     }
    //   }),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    company_name: Joi.string().allow(null, "").optional(),
    department: Joi.string().allow(null, "").optional(),
    survey_condition: Joi.string().required(),
    investigation_start_date: Joi.string().required(),
    investigation_end_date: Joi.string().required(),
    survey_target: Joi.string().allow(null, "").optional(),
    survey_content: Joi.string().required(),
    panel: Joi.string().valid("smart_panel", "netpoint").required(),
  }),
});
