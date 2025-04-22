const db = require("../config/db");

const inventarioModel = {
  getAll: async () => {
    return new Promise((resolve, reject) => {
      db.exec("SELECT * FROM Inventario", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  create: async ({ producto_id, cantidad, ubicacion }) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Inventario (producto_id, cantidad, ubicacion)
        VALUES (?, ?, ?)
      `;
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([producto_id, cantidad, ubicacion], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },
};

module.exports = inventarioModel;
