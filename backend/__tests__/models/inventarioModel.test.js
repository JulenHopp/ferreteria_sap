jest.mock('../../src/config/db', () => ({
  exec: jest.fn(),
  prepare: jest.fn()
}));

const db = require('../../src/config/db');
const inventarioModel = require('../../src/models/inventarioModel');

describe('inventarioModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('debería devolver el inventario completo', async () => {
      const mockResult = [{ id: 1, producto_id: 2 }];
      db.exec.mockImplementation((query, cb) => cb(null, mockResult));

      const res = await inventarioModel.getAll();

      expect(db.exec).toHaveBeenCalledWith('SELECT * FROM Inventario', expect.any(Function));
      expect(res).toEqual(mockResult);
    });

    it('debería lanzar error si falla la DB', async () => {
      db.exec.mockImplementation((query, cb) => cb(new Error('DB error')));
      await expect(inventarioModel.getAll()).rejects.toThrow('DB error');
    });
  });

  describe('create', () => {
    it('debería crear un nuevo registro en el inventario', async () => {
      const mockStatement = {
        exec: jest.fn((params, cb) => cb(null, { success: true })),
      };
      db.prepare.mockImplementation((query, cb) => cb(null, mockStatement));

      const input = {
        producto_id: 1,
        cantidad: 50,
        ubicacion: 'A1'
      };

      const res = await inventarioModel.create(input);

      expect(db.prepare).toHaveBeenCalledWith(expect.any(String), expect.any(Function));
      expect(mockStatement.exec).toHaveBeenCalledWith(
        [1, 50, 'A1'],
        expect.any(Function)
      );
      expect(res).toEqual({ success: true });
    });

    it('debería lanzar error si falla prepare', async () => {
      db.prepare.mockImplementation((query, cb) => cb(new Error('Prepare error')));

      await expect(inventarioModel.create({})).rejects.toThrow('Prepare error');
    });
  });

  describe('updateCantidad', () => {
    it('debería ejecutar el procedimiento almacenado con los valores correctos', async () => {
      db.exec.mockImplementation((query, params, cb) => cb(null, { affectedRows: 1 }));

      const res = await inventarioModel.updateCantidad({
        inventario_id: 5,
        cantidad: 30
      });

      expect(db.exec).toHaveBeenCalledWith(
        'CALL modificar_cantidad(?, ?)',
        [5, 30],
        expect.any(Function)
      );
      expect(res).toEqual({ affectedRows: 1 });
    });
  });

  describe('updateUbicacion', () => {
    it('debería actualizar la ubicación', async () => {
      db.exec.mockImplementation((query, params, cb) => cb(null, { affectedRows: 1 }));

      const res = await inventarioModel.updateUbicacion({
        inventario_id: 3,
        ubicacion: 'B2'
      });

      expect(db.exec).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE INVENTARIO'),
        ['B2', 3],
        expect.any(Function)
      );
      expect(res).toEqual({ affectedRows: 1 });
    });
  });

  describe('updateInventoryAndProductDetails', () => {
    it('debería llamar al procedimiento para actualizar inventario y producto', async () => {
      db.exec.mockImplementation((query, params, cb) => cb(null, { success: true }));

      const data = {
        inventario_id: 1,
        producto_id: 2,
        nombre: 'Producto Test',
        categoria_id: 3,
        cantidad: 100,
        descripcion: 'Descripción',
        ubicacion: 'C1',
        precio_unitario: 99.99
      };

      const res = await inventarioModel.updateInventoryAndProductDetails(data);

      expect(db.exec).toHaveBeenCalledWith(
        expect.stringContaining('CALL editar_inventario_y_producto'),
        Object.values(data),
        expect.any(Function)
      );
      expect(res).toEqual({ success: true });
    });
  });
});