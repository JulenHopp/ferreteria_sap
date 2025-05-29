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

  getAllWithDetails: async () => {
    return new Promise((resolve, reject) => {
      db.exec("SELECT * FROM ordenes_with_details", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  getById: async (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Ordenes WHERE id = ?";
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([id], (err, result) => {
          if (err) return reject(err);
          resolve(result.length > 0 ? result[0] : null);
        });
      });
    });
  },

  create: async (orden) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Ordenes (
          usuario_id, estado_id, proveedor_id, producto_id,
          cantidad, precio_unitario, costo_total, sugerida_por_ia
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([
          orden.usuario_id,
          orden.estado_id,
          orden.proveedor_id,
          orden.producto_id,
          orden.cantidad,
          orden.precio_unitario,
          orden.costo_total,
          orden.sugerida_por_ia,
        ], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  update: async (id, orden) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE Ordenes SET
          usuario_id = ?, estado_id = ?, proveedor_id = ?, producto_id = ?,
          cantidad = ?, precio_unitario = ?, costo_total = ?, sugerida_por_ia = ?
        WHERE id = ?
      `;
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([
          orden.usuario_id,
          orden.estado_id,
          orden.proveedor_id,
          orden.producto_id,
          orden.cantidad,
          orden.precio_unitario,
          orden.costo_total,
          orden.sugerida_por_ia,
          id
        ], (err) => {
          if (err) return reject(err);
          resolve(true);
        });
      });
    });
  },

  updateEstado: async (id, estado_id) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE Ordenes SET estado_id = ? WHERE id = ?";
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([estado_id, id], (err) => {
          if (err) return reject(err);
          resolve(true);
        });
      });
    });
  },

  delete: async (id) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM Ordenes WHERE id = ?";
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec([id], (err) => {
          if (err) return reject(err);
          resolve(true);
        });
      });
    });
  },

  getAllEstadosDisponibles: async () => {
    return new Promise((resolve, reject) => {
      db.exec("SELECT * FROM Estados_ordenes", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};

module.exports = OrdenesModel;