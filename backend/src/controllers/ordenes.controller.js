const { getOrdenes } = require('../models/ordenes.model');

async function listarOrdenes(req, res) {
  try {
    const ordenes = await getOrdenes();
    res.json(ordenes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listarOrdenes };