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

const db = require("../config/db");

const OrdenesModel = {
  getAll: async () => {
    return new Promise((resolve, reject) => {
      db.exec("SELECT * FROM Ordenes", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};


module.exports = OrdenesModel;