// controllers/proveedorController.js
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

  createProveedor: async (req, res) => {
    try {
      const { nombre, correo, telefono } = req.body;
      await ProveedorModel.create({ nombre, correo, telefono });
      res.status(201).json({ message: "Proveedor creado correctamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = ProveedorController;
