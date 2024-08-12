import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import { customFileHelper } from "../../helpers/index.js";
import {
  adminUserAccessControl,
  importFileUploadCustomerBusinessLogo,
  validateAdminAccessToken,
  validateApiKey,
} from "../../middleware/index.js";
import { adminValidation } from "../../validations/index.js";

const businessRouter = Router();

/*Business Modal add*/
businessRouter.post(
  "/add",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.businessValidation.addBusiness,
  adminController.businessController.addBusiness,
);

/*duplicate check method Modal list*/
businessRouter.get(
  "/duplicate-check-method",
  validateApiKey,
  validateAdminAccessToken,
  adminController.businessController.duplicateCheckMethodList,
);

/*Business Modal list*/
businessRouter.post(
  "/list",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.businessValidation.businessList,
  adminController.businessController.businessList,
);

/*Business Modal details*/
businessRouter.get(
  "/details/:id",
  validateApiKey,
  validateAdminAccessToken,
  adminValidation.businessValidation.businessDetails,
  adminController.businessController.businessDetails,
);

/*Business Modal update*/
businessRouter.post(
  "/update",
  validateApiKey,
  validateAdminAccessToken,
  adminValidation.businessValidation.updateBusiness,
  adminController.businessController.updateBusiness,
);

/*business payment modal details*/
businessRouter.get(
  "/survey-information",
  validateApiKey,
  validateAdminAccessToken,
  adminValidation.businessValidation.surveyInformationDetails,
  adminController.businessController.surveyInformationDetails,
);

/*Business conversion restriction Modal add*/
businessRouter.post(
  "/conversion-restriction/add",
  validateApiKey,
  validateAdminAccessToken,
  adminValidation.businessValidation.addConversionRestrictionInfo,
  adminController.businessController.addConversionRestrictionInfo,
);

/*Business conversion restriction Modal update*/
businessRouter.post(
  "/conversion-restriction/update",
  validateApiKey,
  validateAdminAccessToken,
  adminValidation.businessValidation.updateConversionRestrictionInfo,
  adminController.businessController.updateConversionRestrictionInfo,
);

/*Business conversion restriction Modal details*/
businessRouter.get(
  "/conversion-restriction",
  validateApiKey,
  validateAdminAccessToken,
  adminValidation.businessValidation.conversionRestrictionDetails,
  adminController.businessController.conversionRestrictionDetails,
);

/*Business payments Modal update*/
businessRouter.post(
  "/payments-update",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.businessValidation.updateBusinessPayments,
  adminController.businessController.updateBusinessPayments,
);

/*business payment modal details*/
businessRouter.get(
  "/payment-details/:businessId",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.businessValidation.businessPaymentDetails,
  adminController.businessController.businessPaymentDetails,
);

/*business payment modal details*/
businessRouter.post(
  "/payment-registered-list",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.businessValidation.getPaymentList,
  adminController.businessController.getPaymentList,
);

businessRouter.get(
  "/write-limit-business-search-list",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.businessValidation.getAllWriteLimitBusinessSearch,
  adminController.businessController.getAllWriteLimitBusinessSearch,
);

businessRouter.post(
  "/business-update-conversionsetting",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  customFileHelper.customFileUpload(
    importFileUploadCustomerBusinessLogo.fields([{ name: "logo", maxCount: 1 }]),
  ),
  adminValidation.businessValidation.updateCustomerBusinessConversionSettingInfo,
  adminController.businessController.updateCustomerBusinessConversionSettingInfo,
);

businessRouter.post(
  "/business-conversionsetting",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.businessValidation.conversionSettingAfterRegistration,
  adminController.businessController.conversionSettingAfterRegistration,
);

//*Business payment registration add*/
businessRouter.post(
  "/registration-payment",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.businessValidation.addRegistrationPayment,
  adminController.businessController.addRegistrationPayment,
);

//*Business Encryption key generation*/
businessRouter.post(
  "/generate-encryption-key",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("customer_management"),
  adminValidation.businessValidation.generateBusinessEncryptionKey,
  adminController.businessController.generateBusinessEncryptionKey,
);
export { businessRouter };
