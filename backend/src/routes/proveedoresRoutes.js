const express = require("express");
const router = express.Router();
const ProveedorController = require("../controllers/proveedoresController");

router.get("/", ProveedorController.getAllProveedores);
router.get("/:id", ProveedorController.getProveedorById);
router.post("/", ProveedorController.createProveedor);
router.put("/:id", ProveedorController.updateProveedor);
router.delete("/:id", ProveedorController.deleteProveedor);

module.exports = router;