// models/usuarioModel.js
const db = require("../config/db");

const UsuarioModel = {
  getAll: async () => {
    return new Promise((resolve, reject) => {
      db.exec("SELECT * FROM Usuarios", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  create: async ({ nombre, correo, contraseña, rol_id }) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Usuarios (nombre, correo, contraseña, rol_id, creado_en)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      `;
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([nombre, correo, contraseña, rol_id], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },
};

module.exports = UsuarioModel;
