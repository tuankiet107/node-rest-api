const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");

router.route("/").get(controller.getProducts).post(controller.createProduct);

router.put("/:productId", controller.updateProduct);

module.exports = router;
