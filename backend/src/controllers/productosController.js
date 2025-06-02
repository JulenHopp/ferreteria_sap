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

  updateProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, categoria_id } = req.body;

      await productosModel.updateById(id, { nombre, categoria_id });
      res.status(200).json({ message: "Producto actualizado correctamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getCategorias: async (req, res) => {
    try {
      const categorias = await productosModel.getAllCategorias();
      res.status(200).json(categorias);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { nombre } = req.body
      await productosModel.createCategory(nombre);
      res.status(200).json({message: "Categoria creada correctamente"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = productosController;
