import { celebrate, Joi } from "celebrate";

export const getContactPersonDetails = celebrate({
  query: Joi.object({
    type: Joi.string().valid("interior", "outside").required(),
    contact_person_id: Joi.number().required(),
  }),
});
