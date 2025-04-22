// routes/proveedorRoutes.js
const express = require("express");
const router = express.Router();
const ProveedorController = require("../controllers/proveedoresController");

router.get("/", ProveedorController.getAllProveedores);
router.post("/", ProveedorController.createProveedor);

module.exports = router;
