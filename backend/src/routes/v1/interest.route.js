const express = require("express");
// const auth = require("../../middlewares/auth");
const { upload } = require("../../middlewares/upload");
const { hobbiesController } = require("../../controllers");

const router = express.Router();

/** Create product */
router.post(
  "/create",
  // auth(),
  upload.single("logo"),
  hobbiesController.createInterest
);

/** Create product */
router.get(
  "/id/:hobbiesId",
  // auth(),
  hobbiesController.getDetailsById
);

router.put(
  "/update/:hobbiesId",
  // auth(),
  upload.single("logo"),
  hobbiesController.updateInterest
);
router.delete("/delete/:hobbiesId",hobbiesController.deleteInterest);

/** Get product details */
// router.get(
//   "/details/:productId",
//   validate(productValidation.getDetails),
//   hobbiesController.getDetails
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