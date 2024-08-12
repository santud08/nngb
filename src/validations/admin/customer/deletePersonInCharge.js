import { celebrate, Joi } from "celebrate";
export const deletePersonInCharge = celebrate({
  body: Joi.object({
    customer_id: Joi.number().required(),
    contact_person_id: Joi.number().required(),
    person_type: Joi.string().valid("interior", "outside").required(),
  }),
});
