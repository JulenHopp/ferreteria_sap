const express = require("express");
const router = express.Router();
const inventarioController = require("../controllers/inventarioController");

router.get("/", inventarioController.getAllInventario);
router.post("/", inventarioController.createInventario);

module.exports = router;
