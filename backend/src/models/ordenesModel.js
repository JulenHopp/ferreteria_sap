/*
id                Int
usuario_id        Int
estado_id         Int
proveedor_id      Int
producto_id       Int
cantidad          Int
precio_unitari    float
costo_tota        float
sugerido_por_ia   bool
creado_en         timestamp
*/

const connectToHana = require('../config/db');

async function getOrdenes() {
  const conn = await connectToHana();
  return new Promise((resolve, reject) => {
    conn.exec('SELECT * FROM Ordenes', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = { getOrdenes };