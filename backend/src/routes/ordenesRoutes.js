const express = require('express');
const router = express.Router();
const ordenesController = require('../controllers/ordenesController');

router.get('/', ordenesController.getOrdenes);
router.get('/with-details', ordenesController.getOrdenesWithDetails);
router.get('/estados', ordenesController.getEstadosDisponibles)
router.get('/:id', ordenesController.getOrdenById);
router.post('/', ordenesController.createOrden);
router.put('/:id', ordenesController.updateOrden);
router.patch('/:id/estado', ordenesController.updateEstado); // Cambiar estado
router.delete('/:id', ordenesController.deleteOrden);

module.exports = router;