const { execQuery } = require("../utils/db_utils");

const ProveedorModel = {
  getAll: () => execQuery("SELECT * FROM Proveedores"),

  getById: async (id) => {
    const result = await execQuery("SELECT * FROM Proveedores WHERE id = ?", [id]);
    return result.length > 0 ? result[0] : null;
  },

  create: ({ nombre, correo, telefono }) =>
    execQuery(
      "INSERT INTO Proveedores (nombre, correo, telefono) VALUES (?, ?, ?)",
      [nombre, correo, telefono]
    ),

  update: (id, { nombre, correo, telefono }) =>
    execQuery(
      "UPDATE Proveedores SET nombre = ?, correo = ?, telefono = ? WHERE id = ?",
      [nombre, correo, telefono, id]
    ).then(() => true),

  delete: (id) =>
    execQuery("DELETE FROM Proveedores WHERE id = ?", [id]).then(() => true),
};

module.exports = ProveedorModel;