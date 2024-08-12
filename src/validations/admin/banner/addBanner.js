import { celebrate, Joi } from "celebrate";

export const addBanner = celebrate({
  body: Joi.object({
    banner_name: Joi.string().required(),
    exposer_start_date: Joi.date().required(),
    exposer_end_date: Joi.date().required(),
    link_url: Joi.string().allow(""),
    link_target: Joi.string().valid("", "new_tab", "same_tab"),
    acquisition_channel: Joi.string().valid("netpoint", "smart_panel"),
  }),
});
