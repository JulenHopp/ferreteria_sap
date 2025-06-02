const db = require("../config/db");

const productosModel = {
  getAll: async () => {
    return new Promise((resolve, reject) => {
      db.exec("SELECT * FROM Productos", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  create: async ({
    nombre,
    descripcion,
    precio_unitario,
    proveedor_id,
    categoria_id,
  }) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Productos (nombre, descripcion, precio_unitario, proveedor_id, categoria_id)
        VALUES (?, ?, ?, ?, ?)
      `;
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec(
          [nombre, descripcion, precio_unitario, proveedor_id, categoria_id],
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          },
        );
      });
    });
  },

  updateById: async (id, { nombre, categoria_id }) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE Productos
        SET nombre = ?, categoria_id = ?
        WHERE id = ?
      `;
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([nombre, categoria_id, id], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  getAllCategorias: async () => {
    return new Promise((resolve, reject) => {
      db.exec("SELECT * FROM Categorias", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  createCategory: async (nombre) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO Categorias (NOMBRE) VALUES (?);"
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([nombre], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    })
  },
};

module.exports = productosModel;
