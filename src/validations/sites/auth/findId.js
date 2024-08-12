import { celebrate, Joi } from "celebrate";
export const findId = celebrate({
  body: Joi.object({
    mobile: Joi.string().required().min(10).max(11),
  }),
});
