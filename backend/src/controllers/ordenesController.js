const ordenesModel = require('../models/ordenesModel');

const ordenesController = {
  getOrdenes: async (req, res) => {
    try {
      const ordenes = await ordenesModel.getAll();
      res.status(200).json(ordenes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getOrdenesWithDetails: async (req, res) => {
    try {
      const ordenesWithDetails = await ordenesModel.getAllWithDetails();
      res.status(200).json(ordenesWithDetails);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  },

  getOrdenById: async (req, res) => {
    try {
      const orden = await ordenesModel.getById(req.params.id);
      if (!orden) return res.status(404).json({ error: 'Orden no encontrada' });
      res.status(200).json(orden);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createOrden: async (req, res) => {
    try {
      const nuevaOrden = req.body;
      await ordenesModel.create(nuevaOrden);
      res.status(201).json({ message: 'Orden creada correctamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateOrden: async (req, res) => {
    try {
      const updated = await ordenesModel.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Orden no encontrada' });
      res.status(200).json({ message: 'Orden actualizada correctamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateEstado: async (req, res) => {
    try {
      const { estado_id } = req.body;
      const updated = await ordenesModel.updateEstado(req.params.id, estado_id);
      if (!updated) return res.status(404).json({ error: 'Orden no encontrada' });
      res.status(200).json({ message: 'Estado actualizado correctamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteOrden: async (req, res) => {
    try {
      const deleted = await ordenesModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Orden no encontrada' });
      res.status(200).json({ message: 'Orden eliminada correctamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getEstadosDisponibles: async (req, res) => {
    try {
      const estados = await ordenesModel.getAllEstadosDisponibles();
      res.status(200).json(estados);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = ordenesController;