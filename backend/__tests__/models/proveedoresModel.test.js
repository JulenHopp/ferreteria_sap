// __tests__/models/ProveedorModel.test.js

jest.mock('../../src/utils/db_utils', () => ({
  execQuery: jest.fn(),
}));

const { execQuery } = require('../../src/utils/db_utils');
const ProveedorModel = require('../../src/models/proveedoresModel');

describe('ProveedorModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('debería llamar execQuery con la consulta correcta y devolver resultados', async () => {
      const mockResult = [{ id: 1, nombre: 'Proveedor1' }];
      execQuery.mockResolvedValue(mockResult);

      const result = await ProveedorModel.getAll();

      expect(execQuery).toHaveBeenCalledWith("SELECT * FROM Proveedores");
      expect(result).toBe(mockResult);
    });
  });

  describe('getById', () => {
    it('debería devolver el proveedor si existe', async () => {
      const mockResult = [{ id: 2, nombre: 'Proveedor2' }];
      execQuery.mockResolvedValue(mockResult);

      const result = await ProveedorModel.getById(2);

      expect(execQuery).toHaveBeenCalledWith("SELECT * FROM Proveedores WHERE id = ?", [2]);
      expect(result).toEqual(mockResult[0]);
    });

    it('debería devolver null si no hay resultados', async () => {
      execQuery.mockResolvedValue([]);

      const result = await ProveedorModel.getById(999);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('debería insertar un nuevo proveedor y devolver el resultado', async () => {
      const mockInsertResult = { insertId: 10 };
      execQuery.mockResolvedValue(mockInsertResult);

      const nuevoProveedor = { nombre: 'Nuevo', correo: 'nuevo@correo.com', telefono: '1234567890' };
      const result = await ProveedorModel.create(nuevoProveedor);

      expect(execQuery).toHaveBeenCalledWith(
        "INSERT INTO Proveedores (nombre, correo, telefono) VALUES (?, ?, ?)",
        [nuevoProveedor.nombre, nuevoProveedor.correo, nuevoProveedor.telefono]
      );
      expect(result).toBe(mockInsertResult);
    });
  });

  describe('update', () => {
    it('debería actualizar un proveedor y devolver true', async () => {
      execQuery.mockResolvedValue({ changes: 1 });

      const proveedorActualizado = { nombre: 'Modificado', correo: 'mod@correo.com', telefono: '0987654321' };
      const result = await ProveedorModel.update(5, proveedorActualizado);

      expect(execQuery).toHaveBeenCalledWith(
        "UPDATE Proveedores SET nombre = ?, correo = ?, telefono = ? WHERE id = ?",
        [proveedorActualizado.nombre, proveedorActualizado.correo, proveedorActualizado.telefono, 5]
      );
      expect(result).toBe(true);
    });
  });

  describe('delete', () => {
    it('debería eliminar un proveedor y devolver true', async () => {
      execQuery.mockResolvedValue({ changes: 1 });

      const result = await ProveedorModel.delete(3);

      expect(execQuery).toHaveBeenCalledWith(
        "DELETE FROM Proveedores WHERE id = ?", [3]
      );
      expect(result).toBe(true);
    });
  });
});