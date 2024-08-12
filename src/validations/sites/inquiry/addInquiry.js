import { celebrate, Joi } from "celebrate";

export const addInquiry = celebrate({
  body: Joi.object({
    parent_id: Joi.number().optional().allow("", null),
    inquiry_category_id: Joi.number().required(),
    inquiry_title: Joi.string().max(255).required(),
    inquiry_description: Joi.string().allow(""),
    inquiry_answer: Joi.string().allow(""),
    user_email: Joi.string().required().email(),
    panel: Joi.string().valid("smart_panel", "netpoint").required(),
  }),
});
