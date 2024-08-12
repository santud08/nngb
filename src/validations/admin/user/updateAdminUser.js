import { celebrate, Joi } from "celebrate";

export const updateAdminUser = celebrate({
  body: Joi.object({
    id: Joi.number().required(),
    department_id: Joi.number().required(),
    headquarter_id: Joi.number().allow("").allow(null).optional(),
    team_id: Joi.number().allow("").allow(null).optional(),
    bu_id: Joi.number().allow("").allow(null).optional(),
    rank: Joi.string().allow("").allow(null).optional(),
    email: Joi.string().email().required(),
    mobile: Joi.string().pattern(new RegExp("^[0-9]{10}$")).min(10).max(11).required(),
    phone: Joi.string()
      .pattern(new RegExp("^[0-9]{10}$"))
      .min(10)
      .max(11)
      .allow("")
      .allow(null)
      .optional(),
    note: Joi.string().allow("").allow(null).optional(),
    status: Joi.string().valid("active", "inactive").required(),
    user_access: Joi.array()
      .items(
        Joi.object({
          access_id: Joi.number().allow(""),
          menu_id: Joi.number().required(),
          action: Joi.number().valid("a", "d", "").default(""),
        }),
      )
      .min(1)
      .required(),
    user_ip_access: Joi.array()
      .items(
        Joi.object({
          id: Joi.number().allow("").allow(null).optional(),
          ip: Joi.string().ip().required(),
          action: Joi.string().valid("a", "d", "").default(""),
        }),
      )
      .min(1)
      .required(),
  }),
});
