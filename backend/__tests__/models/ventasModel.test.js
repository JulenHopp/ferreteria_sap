jest.mock('../../src/config/db', () => ({
  exec: jest.fn(),
  prepare: jest.fn(),
}));

const db = require('../../src/config/db');
const ventasModel = require('../../src/models/ventasModel');

describe('ventasModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('debería devolver todas las ventas', async () => {
      const mockVentas = [{ id: 1, producto_id: 3 }];
      db.exec.mockImplementation((query, cb) => cb(null, mockVentas));

      const result = await ventasModel.getAll();

      expect(db.exec).toHaveBeenCalledWith("SELECT * FROM Ventas", expect.any(Function));
      expect(result).toBe(mockVentas);
    });

    it('debería rechazar si hay error al obtener ventas', async () => {
      const error = new Error('DB error');
      db.exec.mockImplementation((query, cb) => cb(error, null));

      await expect(ventasModel.getAll()).rejects.toThrow('DB error');
    });
  });

  describe('create', () => {
    it('debería crear una venta correctamente', async () => {
      const venta = { producto_id: 1, cantidad: 2, precio_unitario: 10, total: 20 };

      const mockStatement = {
        exec: jest.fn((params, cb) => cb(null, { insertId: 99 })),
      };

      db.prepare.mockImplementation((query, cb) => cb(null, mockStatement));

      const result = await ventasModel.create(venta);

      expect(db.prepare).toHaveBeenCalled();
      expect(mockStatement.exec).toHaveBeenCalledWith(
        [venta.producto_id, venta.cantidad, venta.precio_unitario, venta.total],
        expect.any(Function)
      );
      expect(result).toEqual({ insertId: 99 });
    });

    it('debería fallar si prepare retorna error', async () => {
      db.prepare.mockImplementation((q, cb) => cb(new Error('prepare failed'), null));

      const venta = { producto_id: 1, cantidad: 2, precio_unitario: 10, total: 20 };

      await expect(ventasModel.create(venta)).rejects.toThrow('prepare failed');
    });

    it('debería fallar si exec retorna error', async () => {
      const venta = { producto_id: 1, cantidad: 2, precio_unitario: 10, total: 20 };

      const mockStatement = {
        exec: jest.fn((params, cb) => cb(new Error('exec failed'), null)),
      };

      db.prepare.mockImplementation((q, cb) => cb(null, mockStatement));

      await expect(ventasModel.create(venta)).rejects.toThrow('exec failed');
    });
  });
});