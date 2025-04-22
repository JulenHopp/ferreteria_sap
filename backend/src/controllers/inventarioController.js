const inventarioModel = require("../models/inventarioModel");

const inventarioController = {
  getAllInventario: async (req, res) => {
    try {
      const inventario = await inventarioModel.getAll();
      res.status(200).json(inventario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createInventario: async (req, res) => {
    try {
      const { producto_id, cantidad, ubicacion } = req.body;
      await inventarioModel.create({ producto_id, cantidad, ubicacion });
      res
        .status(201)
        .json({ message: "Registro de inventario creado correctamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = inventarioController;
