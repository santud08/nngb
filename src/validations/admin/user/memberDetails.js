import { celebrate, Joi } from "celebrate";
export const memberDetails = celebrate({
  query: Joi.object({
    id: Joi.number().required(),
  }),
});
