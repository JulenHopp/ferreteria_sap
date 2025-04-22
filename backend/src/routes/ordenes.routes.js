const express = require('express');
const router = express.Router();
const { listarOrdenes } = require('../controllers/ordenes.controller');

router.get('/', listarOrdenes);

module.exports = router;