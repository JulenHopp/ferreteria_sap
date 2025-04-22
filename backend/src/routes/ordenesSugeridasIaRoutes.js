const express = require("express");
const router = express.Router();
const ordenesSugeridadIaController = require("../controllers/ordenesSugeridasIaController");

router.get("/", ordenesSugeridadIaController.getAllOrdenes);
router.post("/", ordenesSugeridadIaController.createOrden);

module.exports = router;
