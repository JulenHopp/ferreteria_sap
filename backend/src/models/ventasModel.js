const db = require("../config/db");

const ventasModel = {
  getAll: async () => {
    return new Promise((resolve, reject) => {
      db.exec("SELECT * FROM Ventas", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  create: async ({ producto_id, cantidad, precio_unitario, total }) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Ventas (producto_id, cantidad, precio_unitario, total, creado_en)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      `;
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec(
          [producto_id, cantidad, precio_unitario, total],
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          },
        );
      });
    });
  },
};

module.exports = ventasModel;
