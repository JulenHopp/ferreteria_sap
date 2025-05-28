const express = require('express');
const router = express.Router();
const ordenesController = require('../controllers/ordenesController');

router.get('/', ordenesController.getOrdenes);

module.exports = router;