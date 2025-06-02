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

  getAllInventarioWithDetails: async (req, res) => {
    try {
      const inventario = await inventarioModel.getAllWithDetails();
      res.status(200).json(inventario)
    } catch (err) {
      res.status(500).json({error: err.message});
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

  updateCantidad: async (req, res) => {
    try {
      const { inventario_id, cantidad } = req.body;
      
      if (!inventario_id || !cantidad || cantidad < 0) 
        res.status(400).json({ error: "Datos ingresados no validos"} );
      
      await inventarioModel.updateCantidad({ inventario_id, cantidad })
      res
        .status(201)
        .json({ message: "Registro de inventario actualizado exitosamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateUbicacion: async (req, res) => {
    try {
      const { inventario_id, ubicacion } = req.body;

      if (!inventario_id || !ubicacion) {
        res.status(500).json({error: "producto o ubicacion no valida"});
      }
      await inventarioModel.updateUbicacion({ inventario_id, ubicacion })
      res
        .status(201)
        .json({ message: "Cambio de ubicacion realizado exitosamente" });
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  },

  updateInventarioAndProducto: async (req, res) => {
    try {
      const {
        inventario_id,
        producto_id,
        nombre,
        categoria_id,
        cantidad,
        descripcion,
        ubicacion,
        precio_unitario
      } = req.body;

      if (
        inventario_id == null ||
        producto_id == null ||
        nombre == null ||
        categoria_id == null ||
        cantidad == null ||
        descripcion == null ||
        ubicacion == null ||
        precio_unitario == null
      ) {
        return res.status(400).json({
          error: 'Faltan campos requeridos en el body'
        });
      }

      await inventarioModel.updateInventoryAndProductDetails({
        inventario_id,
        producto_id,
        nombre,
        categoria_id,
        cantidad,
        descripcion,
        ubicacion,
        precio_unitario
      });

      res.status(200).json({ message: 'Inventario y producto actualizados correctamente' });
    } catch (err) {
      console.error('Error en updateInventarioAndProducto:', err);
      res.status(500).json({ error: 'Error al actualizar inventario y producto', details: err.message });
    }
  }
};

module.exports = inventarioController;
