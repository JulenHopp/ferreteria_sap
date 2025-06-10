// routes/iaRoutes.js
const express = require('express');
const router = express.Router();
const iaController = require('../controllers/iaController');

router.post('/predict', iaController.predecirOrdenes);

module.exports = router;