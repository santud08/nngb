import { StatusError } from "../../../config/StatusErrors.js";
import * as models from "../../../models/index.js";
import { Op, col } from "sequelize";

/**
 * viewCustomer
 * @param req
 * @param res
 */
export const viewCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.customer_id ? req.params.customer_id : null;
    if (!customerId) throw StatusError.badRequest(res.__("invalidId"));

    const customer = await models.db.customer.findOne({
      where: {
        id: customerId,
        status: "active",
      },
      include: [
        {
          model: models.db.adminUsers,
          as: "affilateUser",
          required: false,
          left: true,
          attributes: [],
          where: { status: { [Op.ne]: "deleted" } },
        },
      ],
      attributes: [
        ["uuid", "vendor_id"],
        ["id", "customer_id"],
        ["customer_name", "representative_name"],
        ["company_customer_name", "company_name"],
        ["company_registration_no", "company_registration_no"],
        [col("affilateUser.user_name"), "affilate_user_id"],
        "is_bu",
        "address",
        "zip_code",
        ["address_details", "detail_address"],
        ["mobile_no", "cell_phone_no"],
        "phone_no",
        "contact_phone_no",
        ["created_at", "registration_date"],
        "vendor_type",
        ["registration_certificate", "business_registration_file"],
        ["bank_book", "bank_book_file"],
      ],
    });

    if (!customer) {
      throw StatusError.badRequest(res.__("customer id does not exist"));
    }

    return res.ok(customer);
  } catch (error) {
    next(error);
  }
};
