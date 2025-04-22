const ventasModel = require("../models/ventasModel");

const ventasController = {
  getAllVentas: async (req, res) => {
    try {
      const ventas = await ventasModel.getAll();
      res.status(200).json(ventas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createVenta: async (req, res) => {
    try {
      const { producto_id, cantidad, precio_unitario, total } = req.body;
      await ventasModel.create({
        producto_id,
        cantidad,
        precio_unitario,
        total,
      });
      res.status(201).json({ message: "Venta registrada correctamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = ventasController;
