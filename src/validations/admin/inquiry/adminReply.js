import { celebrate, Joi } from "celebrate";

export const adminReply = celebrate({
  body: Joi.object({
    inquiry_id: Joi.number().required(),
    inquiry_answer: Joi.string().required(),
  }),
});
