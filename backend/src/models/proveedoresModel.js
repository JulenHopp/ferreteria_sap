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

  getById: async (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Proveedores WHERE id = ?";
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([id], (err, result) => {
          if (err) return reject(err);
          resolve(result.length > 0 ? result[0] : null);
        });
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

  update: async (id, { nombre, correo, telefono }) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE Proveedores
        SET nombre = ?, correo = ?, telefono = ?
        WHERE id = ?
      `;
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([nombre, correo, telefono, id], (err) => {
          if (err) return reject(err);
          // No hay manera directa de saber cuántas filas fueron afectadas, así que asumimos éxito si no hubo error
          resolve(true);
        });
      });
    });
  },

  delete: async (id) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM Proveedores WHERE id = ?";
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([id], (err, result) => {
          if (err) return reject(err);
          resolve(true);
        });
      });
    });
  },
};

module.exports = ProveedorModel;