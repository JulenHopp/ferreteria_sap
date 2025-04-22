const productosModel = require("../models/productosModel");

const productosController = {
  getAllProductos: async (req, res) => {
    try {
      const productos = await productosModel.getAll();
      res.status(200).json(productos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createProducto: async (req, res) => {
    try {
      const {
        nombre,
        descripcion,
        precio_unitario,
        proveedor_id,
        categoria_id,
      } = req.body;
      await productosModel.create({
        nombre,
        descripcion,
        precio_unitario,
        proveedor_id,
        categoria_id,
      });
      res.status(201).json({ message: "Producto creado correctamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = productosController;
