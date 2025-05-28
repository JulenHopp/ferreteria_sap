const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");

router.get("/", productosController.getAllProductos);
router.post("/", productosController.createProducto);
router.put("/:id", productosController.updateProducto);
router.get("/categorias", productosController.getCategorias);

module.exports = router;
