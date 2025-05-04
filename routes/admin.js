const path = require("path");
const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");
// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/add-product => POST
//router.post("/products", adminController.getProducts);

// /admin/products => GET
router.get("/products", adminController.getProducts);

router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);



module.exports = router;
