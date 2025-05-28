const ProveedorModel = require("../models/proveedoresModel");

const ProveedorController = {
  getAllProveedores: async (req, res) => {
    try {
      const proveedores = await ProveedorModel.getAll();
      res.status(200).json(proveedores);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getProveedorById: async (req, res) => {
    try {
      const proveedor = await ProveedorModel.getById(req.params.id);
      if (!proveedor) return res.status(404).json({ error: "Proveedor no encontrado" });
      res.status(200).json(proveedor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createProveedor: async (req, res) => {
    try {
      const { nombre, correo, telefono } = req.body;
      await ProveedorModel.create({ nombre, correo, telefono });
      res.status(201).json({ message: "Proveedor creado correctamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateProveedor: async (req, res) => {
    try {
      const { nombre, correo, telefono } = req.body;
      const updated = await ProveedorModel.update(req.params.id, { nombre, correo, telefono });
      console.log(updated);
      if (!updated) return res.status(404).json({ error: "Proveedor no encontrado" });
      res.status(200).json({ message: "Proveedor actualizado correctamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteProveedor: async (req, res) => {
    try {
      const deleted = await ProveedorModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Proveedor no encontrado" });
      res.status(200).json({ message: "Proveedor eliminado correctamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = ProveedorController;