const ordenesModel = require('../models/ordenesModel');

const ordenesController = {
  getOrdenes: async (req, res) => {
    try {
      const ordenes = await ordenesModel.getAll();
      res.status(200).json(ordenes);
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
};

module.exports = ordenesController;