import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper, generalHelper } from "../../../helpers/index.js";
import { customerService } from "../../../services/index.js";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * save customer
 * User can save customer info with details
 * @param req
 * @param res
 * @param next
 */
export const saveCustomer = async (req, res, next) => {
  try {
    const reqFiles = req.files;
    // if (
    //   !reqFiles ||
    //   !reqFiles.business_registration_file ||
    //   reqFiles.business_registration_file.length <= 0
    // ) {
    //   throw StatusError.badRequest(res.__("Business registration file is required"));
    // }

    // if (
    //   !reqFiles ||
    //   !reqFiles.copy_of_bank_book_file ||
    //   reqFiles.copy_of_bank_book_file.length <= 0
    // ) {
    //   throw StatusError.badRequest(res.__("Copy of bank book file is required"));
    // }

    const reqBody = req.body;
    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    if (reqBody.type == "individual" && reqBody.cell_phone_no) {
      const isMobileExist = await model.db.customer.findOne({
        where: {
          mobile_no: reqBody.cell_phone_no,
          type: "individual",
          status: { [Op.ne]: "deleted" },
        },
      });
      if (isMobileExist) {
        throw StatusError.badRequest(res.__("This mobile is already registered"));
      }
    }

    if (reqBody.phone_no) {
      const isMobileExist = await model.db.customer.findOne({
        where: {
          phone_no: reqBody.phone_no,
          status: { [Op.ne]: "deleted" },
        },
      });
      if (isMobileExist) {
        throw StatusError.badRequest(res.__("This phone no is already registered"));
      }
    }

    if (reqBody.contact_phone_no) {
      const isMobileExist = await model.db.customer.findOne({
        where: {
          contact_phone_no: reqBody.contact_phone_no,
          status: { [Op.ne]: "deleted" },
        },
      });
      if (isMobileExist) {
        throw StatusError.badRequest(res.__("This contact phone no is already registered"));
      }
    }

    if (reqBody.type == "corporation" && reqBody.company_registration_no) {
      const isCompanyExist = await model.db.customer.findOne({
        where: {
          company_registration_no: reqBody.company_registration_no,
          type: "corporation",
          status: { [Op.ne]: "deleted" },
        },
      });
      if (isCompanyExist) {
        throw StatusError.badRequest(
          res.__("The company with same registration number already exist"),
        );
      }
    }

    // if (reqBody.phone_no) {
    //   const isPhoneExist = await model.db.customer.findOne({
    //     where: { phone_no: reqBody.phone_no, status: { [Op.ne]: "deleted" } },
    //   });
    //   if (isPhoneExist) {
    //     throw StatusError.badRequest(res.__("This phone no is already registered"));
    //   }
    // }

    //Get max ID
    const resultMaxId = await customerService.getCustomerMaxId();
    let maxId = 1;
    if (resultMaxId) {
      maxId = resultMaxId.maxId + 1;
    }

    //H-Code generation
    const ccode = generalHelper.generateCCode(maxId);

    // prepare data for insertion
    const data = {
      uuid: ccode,
      customer_name: reqBody.representative_name || null,
      type: reqBody.type,
      company_customer_name: reqBody.company_name,
      is_bu: reqBody.is_bu ? reqBody.is_bu : "n",
      company_registration_no: reqBody.company_registration_no
        ? reqBody.company_registration_no
        : null,
      mobile_no: reqBody.cell_phone_no ? reqBody.cell_phone_no : null,
      zip_code: reqBody.zip_code ? reqBody.zip_code : null,
      address: reqBody.address ? reqBody.address : null,
      address_details: reqBody.detailed_address ? reqBody.detailed_address : null,
      phone_no: reqBody.phone_no ? reqBody.phone_no : null,
      contact_phone_no: reqBody.contact_phone_no ? reqBody.contact_phone_no : null,
      vendor_type: reqBody.vendor_type.join(","),
      registration_certificate:
        req.files &&
        req.files.business_registration_file &&
        req.files.business_registration_file[0] &&
        req.files.business_registration_file[0].location
          ? req.files.business_registration_file[0].location
          : null,
      registration_certificate_file_name:
        req.files.business_registration_file &&
        req.files.business_registration_file[0] &&
        req.files.business_registration_file[0].key
          ? req.files.business_registration_file[0].key
          : null,
      registration_certificate_original_filename:
        req.files.business_registration_file &&
        req.files.business_registration_file[0] &&
        req.files.business_registration_file[0].originalname
          ? req.files.business_registration_file[0].originalname
          : null,
      bank_book:
        req.files.copy_of_bank_book_file &&
        req.files.copy_of_bank_book_file[0] &&
        req.files.copy_of_bank_book_file[0].location
          ? req.files.copy_of_bank_book_file[0].location
          : null,
      bank_book_file_name:
        req.files.copy_of_bank_book_file &&
        req.files.copy_of_bank_book_file[0] &&
        req.files.copy_of_bank_book_file[0].key
          ? req.files.copy_of_bank_book_file[0].key
          : null,
      bank_book_original_file_name:
        req.files.copy_of_bank_book_file &&
        req.files.copy_of_bank_book_file[0] &&
        req.files.copy_of_bank_book_file[0].originalname
          ? req.files.copy_of_bank_book_file[0].originalname
          : null,
      status: "active",
      created_by: userId,
      created_at: reqBody.registration_date
        ? reqBody.registration_date
        : await customDateTimeHelper.getCurrentDateTime(),
    };
    const results = await model.db.customer.create(data);

    res.ok({
      message: res.__("Saved successfully"),
      customer_id: results.id,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
