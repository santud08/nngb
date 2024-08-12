import { celebrate, Joi } from "celebrate";

export const updateFaq = celebrate({
  body: Joi.object({
    faq_id: Joi.number().required(),
    faq_category_id: Joi.number().required(),
    faq_title: Joi.string().required(),
    faq_description: Joi.string().required(),
    panel: Joi.string().valid("netpoint", "smart_panel").required(),
    status: Joi.string().valid("active", "inactive").default("active"),
  }),
});
