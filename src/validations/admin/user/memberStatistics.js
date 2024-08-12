import { celebrate, Joi } from "celebrate";
export const memberStatistics = celebrate({
  query: Joi.object({
    date: Joi.date().iso().optional(),
  }),
});
