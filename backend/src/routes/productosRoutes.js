const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");

router.get("/", productosController.getAllProductos);
router.post("/", productosController.createProducto);

module.exports = router;
