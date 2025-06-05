// models/usuarioModel.js
const db = require("../config/db");
const bcrypt = require("bcrypt");

const UsuarioModel = {
  getAll: async () => {
    return new Promise((resolve, reject) => {
      db.exec("SELECT * FROM usuarios_with_details", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  getByEmail: async (email) => {
    const query = `SELECT * FROM USUARIOS WHERE correo = ?`;
    const result = await db.execute(query, [email]);
    return result[0];
  },

  create: async ({ nombre, correo, contrasena, rol_id }) => {
    const hashedPassword = await bcrypt.hash(contrasena, 10); // 🔐 encriptamos

    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Usuarios (nombre, correo, contrasena, rol_id, creado_en)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      `;
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([nombre, correo, hashedPassword, rol_id], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  update: async ({ id, nombre, correo, contrasena, rol_id }) => {
    let hashedPassword = null;

    if (contrasena) {
      hashedPassword = await bcrypt.hash(contrasena, 10);
    }

    return new Promise((resolve, reject) => {
      const query = `
        UPDATE Usuarios
        SET nombre = ?, correo = ?, ${contrasena ? "contrasena = ?, " : ""} rol_id = ?
        WHERE id = ?
      `;

      const params = contrasena
        ? [nombre, correo, hashedPassword, rol_id, id]
        : [nombre, correo, rol_id, id];

      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec(params, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  delete: async (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Usuarios WHERE id = ?`;
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([id], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },
  
  getAllRoles: async () => {
    return new Promise((resolve, reject) => {
      db.exec("SELECT * FROM Roles", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = UsuarioModel;
