// models/proveedorModel.js
const db = require("../config/db");

const ProveedorModel = {
  getAll: async () => {
    return new Promise((resolve, reject) => {
      db.exec("SELECT * FROM Proveedores", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  create: async ({ nombre, correo, telefono }) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Proveedores (nombre, correo, telefono)
        VALUES (?, ?, ?)
      `;
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([nombre, correo, telefono], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },
};

module.exports = ProveedorModel;
