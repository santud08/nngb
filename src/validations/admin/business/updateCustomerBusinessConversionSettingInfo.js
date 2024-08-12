import { celebrate, Joi } from "celebrate";

export const updateCustomerBusinessConversionSettingInfo = celebrate({
  body: Joi.object({
    business_id: Joi.number().required(),
    module_format: Joi.string().valid("xml-api-server", "xml-api-client", "option"),
    is_confirm: Joi.string().valid("y", "n"),
    encryption_format: Joi.string().valid("aes128", "seed128", "option"),
    encryption_key: Joi.string().allow(""), // Allow empty string as well
    address_url: Joi.string(),
    authentication_method: Joi.string().required().valid("i,p"),
    conversion_rate_from: Joi.string(),
    conversion_rate_to: Joi.string(),
    company_fees: Joi.string(),
    member_fees: Joi.string(),
    logo: Joi.string().optional(), // Allow empty string as well
  }),
});
