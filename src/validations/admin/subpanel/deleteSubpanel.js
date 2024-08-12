import { celebrate, Joi } from "celebrate";
export const deleteSubpanel = celebrate({
  body: Joi.object({
    id: Joi.number().required(),
  }),
});
