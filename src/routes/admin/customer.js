import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import {
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl,
  importFileUploadCustomer,
} from "../../middleware/index.js";
import { adminValidation } from "../../validations/index.js";
import { customFileHelper } from "../../helpers/index.js";

const customerRouter = Router();

customerRouter.get(
  "/check-duplicate-company-registration-no",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.customerValidation.checkDuplicateCompanyRegistrationNo,
  adminController.customerController.checkDuplicateCompanyRegistrationNo,
);

customerRouter.get(
  "/check-duplicate-mobile-no",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.customerValidation.checkDuplicateMobileNo,
  adminController.customerController.checkDuplicateMobileNo,
);

customerRouter.post(
  "/save",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  customFileHelper.customFileUpload(
    importFileUploadCustomer.fields([
      { name: "business_registration_file", maxCount: 1 },
      { name: "copy_of_bank_book_file", maxCount: 1 },
    ]),
  ),
  adminValidation.customerValidation.saveCustomer,
  adminController.customerController.saveCustomer,
);

customerRouter.post(
  "/",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("member_management"),
  adminValidation.customerValidation.getAllCustomer,
  adminController.customerController.getAllCustomer,
);

customerRouter.get(
  "/details/:customer_id",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.customerValidation.viewCustomer,
  adminController.customerController.viewCustomer,
);

customerRouter.post(
  "/business-details",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.customerValidation.viewCustomerBusiness,
  adminController.customerController.viewCustomerBusiness,
);

customerRouter.post(
  "/save-person-in-charge",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.customerValidation.savePersonInCharge,
  adminController.customerController.savePersonInCharge,
);

customerRouter.post(
  "/person-in-charge-list",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.customerValidation.getAllPersonInCharge,
  adminController.customerController.getAllPersonInCharge,
);

customerRouter.get(
  "/contact-person-search-list",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.customerValidation.getAllContactPersonSearch,
  adminController.customerController.getAllContactPersonSearch,
);

customerRouter.get(
  "/contact-person-details",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.customerValidation.getContactPersonDetails,
  adminController.customerController.getContactPersonDetails,
);

customerRouter.post(
  "/delete-person-in-charge",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.customerValidation.deletePersonInCharge,
  adminController.customerController.deletePersonInCharge,
);

customerRouter.post(
  "/create-credential",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.customerValidation.createCustomerCredential,
  adminController.customerController.createCustomerCredential,
);

customerRouter.post(
  "/update",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  customFileHelper.customFileUpload(
    importFileUploadCustomer.fields([
      { name: "business_registration_file", maxCount: 1 },
      { name: "copy_of_bank_book_file", maxCount: 1 },
    ]),
  ),
  adminValidation.customerValidation.updateCustomer,
  adminController.customerController.updateCustomer,
);

export { customerRouter };
