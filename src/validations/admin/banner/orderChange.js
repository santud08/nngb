import { celebrate, Joi } from "celebrate";

export const orderChange = celebrate({
  body: Joi.object({
    banner_id: Joi.number().required(),
    direction: Joi.string().required().valid("up", "down"),
  }),
});
