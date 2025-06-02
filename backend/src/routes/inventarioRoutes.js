const express = require("express");
const router = express.Router();
const inventarioController = require("../controllers/inventarioController");

router.get("/", inventarioController.getAllInventario);
router.get("/with-details", inventarioController.getAllInventarioWithDetails);
router.post("/", inventarioController.createInventario);
router.put("/update-cantidad", inventarioController.updateCantidad);
router.put("/update-ubicacion", inventarioController.updateUbicacion);
router.put("/update-inventario-producto", inventarioController.updateInventarioAndProducto);

module.exports = router;
