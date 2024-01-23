const express = require("express");
// const auth = require("../../middlewares/auth");
const { upload } = require("../../../middlewares/upload");
const { countryCodeController } = require("../../../controllers");

const router = express.Router();

/** Create product */
router.post(
  "/create",
  // auth(),
  upload.single("countryflag"),
  countryCodeController.createCountryCode
);

/** Create product */
// router.get(
//   "/id/:CountrycodeId",
//   // auth(),
//   countryCodeController.getDetailsById
// );

router.get("/list-code", countryCodeController.countryCodeList);

router.put(
  "/update/:CountrycodeId",
  // auth(),
  upload.single("countryflag"),
  countryCodeController.updateCountryCode
);
router.delete("/delete/:CountrycodeId",countryCodeController.deleteCountryCode);

router.delete("/delete-many", countryCodeController.multipleDelete);
router.put("/updateCodeStatus/:id",countryCodeController.updateCountryCodeStatus);
router.delete("/deleteMulticode",countryCodeController.deleteMultiCountryCode);


/** Get product details */
// router.get(
//   "/details/:productId",
//   validate(productValidation.getDetails),
//   countryCodeController.getDetails
// );

// /** Get details using aggrgation */
// router.get(
//   "/details-agg/:productId",
//   validate(productValidation.getDetails),
//   hobbiesController.getDetailsByAggegation
// );

// /** Get production list */
// router.get(
//   "/list",
//   validate(productValidation.getList),
//   hobbiesController.getProductList
// );

// /** Update product details */
// router.put(
//   "/update/:productId",
//   auth(),
//   upload.single("product_image"),
//   validate(productValidation.updateProduct),
//   hobbiesController.updateProduct
// );

// /** Manage product status */
// router.put(
//   "/manage-status/:productId",
//   auth(),
//   validate(productValidation.getDetails),
//   hobbiesController.manageProductStatus
// );

// /** Delete product */
// router.delete(
//   "/delete/:productId",
//   auth(),
//   validate(productValidation.getDetails),
//   hobbiesController.deleteProduct
// );

module.exports = router;