import { celebrate, Joi } from "celebrate";

export const checkDuplicateCompanyRegistrationNo = celebrate({
  query: Joi.object({
    company_registration_no: Joi.string().required().min(5).max(255),
    customer_id: Joi.string().optional().allow("", null),
  }),
});
