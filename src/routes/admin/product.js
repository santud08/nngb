import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import {
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl,
  importFileUploadProductCategory,
  importFileUploadProduct,
} from "../../middleware/index.js";
import { adminValidation } from "../../validations/index.js";
import { customFileHelper } from "../../helpers/index.js";
const productRouter = Router();

productRouter.post(
  "/category/add",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("product_management"),
  customFileHelper.customFileUpload(importFileUploadProductCategory.array("category_img", 1)),
  adminValidation.productValidation.registerProductCategory,
  adminController.productController.registerProductCategory,
);

productRouter.post(
  "/category/update",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("product_management"),
  customFileHelper.customFileUpload(importFileUploadProductCategory.array("category_img", 1)),
  adminValidation.productValidation.updateProductCategory,
  adminController.productController.updateProductCategory,
);

productRouter.post(
  "/category-list",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("product_management"),
  adminValidation.productValidation.productCategoryList,
  adminController.productController.productCategoryList,
);

productRouter.get(
  "/category/:id",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("product_management"),
  adminValidation.productValidation.productCategoryDetails,
  adminController.productController.productCategoryDetails,
);

productRouter.post(
  "/category/delete",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("product_management"),
  adminValidation.productValidation.deleteProductCategory,
  adminController.productController.deleteProductCategory,
);

productRouter.post(
  "/add",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("product_management"),
  customFileHelper.customFileUpload(importFileUploadProduct.array("product_image", 1)),
  adminValidation.productValidation.productRegistration,
  adminController.productController.productRegistration,
);

productRouter.post(
  "/lists-by-category",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("product_management"),
  adminValidation.productValidation.productListsByCategory,
  adminController.productController.productListsByCategory,
);

productRouter.get(
  "/:id",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("product_management"),
  adminValidation.productValidation.productDetails,
  adminController.productController.productDetails,
);

productRouter.post(
  "/update",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("product_management"),
  customFileHelper.customFileUpload(importFileUploadProduct.array("product_image", 1)),
  adminValidation.productValidation.productUpdate,
  adminController.productController.productUpdate,
);

productRouter.post(
  "/delete",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("product_management"),
  adminValidation.productValidation.deleteProduct,
  adminController.productController.deleteProduct,
);

productRouter.post(
  "/order-list",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("product_management"),
  adminValidation.productValidation.productOrderList,
  adminController.productController.productOrderList,
);

productRouter.post(
  "/update-order-request",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("product_management"),
  adminValidation.productValidation.updateOrderRequestStatus,
  adminController.productController.updateOrderRequestStatus,
);

productRouter.get(
  "/cash-conversion-details/:id",
  validateApiKey,
  validateAdminAccessToken,
  adminUserAccessControl("product_management"),
  adminValidation.productValidation.cashConversionDetails,
  adminController.productController.cashConversionDetails,
);

export { productRouter };
