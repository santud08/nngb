import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import * as model from "../../../models/index.js";

/**
 * update customer
 * User can update customer info with details
 * @param req
 * @param res
 * @param next
 */
export const updateCustomer = async (req, res, next) => {
  try {
    const reqFiles = req.files;
    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    const customer = await model.db.customer.findOne({
      where: {
        id: reqBody.customer_id,
        status: "active",
      },
    });
    if (!customer) {
      throw StatusError.badRequest(res.__("customer id does not exist"));
    }

    // prepare data for updation
    const data = {
      customer_name: reqBody.representative_name || null,
      company_customer_name: reqBody.company_name,
      is_bu: reqBody.is_bu ? reqBody.is_bu : "n",
      zip_code: reqBody.zip_code ? reqBody.zip_code : null,
      address: reqBody.address ? reqBody.address : null,
      address_details: reqBody.detailed_address ? reqBody.detailed_address : null,
      phone_no: reqBody.phone_no ? reqBody.phone_no : null,
      contact_phone_no: reqBody.contact_phone_no ? reqBody.contact_phone_no : null,
      vendor_type: reqBody.vendor_type.join(","),
      updated_by: userId,
      updated_at: reqBody.registration_date
        ? reqBody.registration_date
        : await customDateTimeHelper.getCurrentDateTime(),
    };

    if (
      reqFiles &&
      reqFiles.business_registration_file &&
      reqFiles.business_registration_file.length > 0
    ) {
      data.registration_certificate = reqFiles.business_registration_file[0].location;
      data.registration_certificate_file_name = reqFiles.business_registration_file[0].key;
      data.registration_certificate_original_filename =
        reqFiles.business_registration_file[0].originalname;
    }
    if (reqFiles && reqFiles.copy_of_bank_book_file && reqFiles.copy_of_bank_book_file.length > 0) {
      data.bank_book = reqFiles.copy_of_bank_book_file[0].location;
      data.bank_book_file_name = reqFiles.copy_of_bank_book_file[0].key;
      data.bank_book_original_file_name = reqFiles.copy_of_bank_book_file[0].originalname;
    }

    await model.db.customer.update(data, { where: { id: reqBody.customer_id } });

    res.ok({
      message: res.__("Updated successfully"),
    });
  } catch (error) {
    next(error);
  }
};
