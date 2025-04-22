const ordenesSugeridadIaModel = require("../models/ordenesSugeridasIaModel");

const ordenesSugeridadIaController = {
  getAllOrdenes: async (req, res) => {
    try {
      const ordenes = await ordenesSugeridadIaModel.getAll();
      res.status(200).json(ordenes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createOrden: async (req, res) => {
    try {
      const { producto_id, cantidad_sugerida, razon, estado_id, proveedor_id } =
        req.body;
      await ordenesSugeridadIaModel.create({
        producto_id,
        cantidad_sugerida,
        razon,
        estado_id,
        proveedor_id,
      });
      res.status(201).json({ message: "Orden sugerida creada correctamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = ordenesSugeridadIaController;
