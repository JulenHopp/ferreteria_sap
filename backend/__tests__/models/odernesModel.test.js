// __tests__/models/ordenesModel.test.js

jest.mock('../../src/config/db', () => ({
  exec: jest.fn(),
  prepare: jest.fn()
}));

const db = require('../../src/config/db');
const OrdenesModel = require('../../src/models/ordenesModel');

describe('OrdenesModel', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('debería devolver todas las órdenes', async () => {
      const mockResult = [{ id: 1 }, { id: 2 }];
      db.exec.mockImplementation((query, cb) => cb(null, mockResult));

      const result = await OrdenesModel.getAll();

      expect(db.exec).toHaveBeenCalledWith("SELECT * FROM Ordenes", expect.any(Function));
      expect(result).toEqual(mockResult);
    });

    it('debería rechazar en caso de error', async () => {
      const error = new Error('DB error');
      db.exec.mockImplementation((query, cb) => cb(error));

      await expect(OrdenesModel.getAll()).rejects.toThrow('DB error');
    });
  });

  describe('getById', () => {
    it('debería devolver la orden por id si existe', async () => {
      const mockResult = [{ id: 1, usuario_id: 123 }];
      const execMock = jest.fn((params, cb) => cb(null, mockResult));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      const result = await OrdenesModel.getById(1);

      expect(db.prepare).toHaveBeenCalledWith("SELECT * FROM Ordenes WHERE id = ?", expect.any(Function));
      expect(execMock).toHaveBeenCalledWith([1], expect.any(Function));
      expect(result).toEqual(mockResult[0]);
    });

    it('debería devolver null si no encuentra la orden', async () => {
      const mockResult = [];
      const execMock = jest.fn((params, cb) => cb(null, mockResult));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      const result = await OrdenesModel.getById(99);

      expect(result).toBeNull();
    });

    it('debería rechazar en caso de error en prepare', async () => {
      const error = new Error('Prepare error');
      db.prepare.mockImplementation((query, cb) => cb(error));

      await expect(OrdenesModel.getById(1)).rejects.toThrow('Prepare error');
    });

    it('debería rechazar en caso de error en exec', async () => {
      const error = new Error('Exec error');
      const execMock = jest.fn((params, cb) => cb(error));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      await expect(OrdenesModel.getById(1)).rejects.toThrow('Exec error');
    });
  });

  describe('create', () => {
    it('debería insertar una nueva orden correctamente', async () => {
      const execMock = jest.fn((params, cb) => cb(null, { insertId: 1 }));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      const newOrden = {
        usuario_id: 1,
        estado_id: 2,
        proveedor_id: 3,
        producto_id: 4,
        cantidad: 10,
        precio_unitario: 100,
        costo_total: 1000,
        sugerida_por_ia: false
      };

      const result = await OrdenesModel.create(newOrden);

      expect(db.prepare).toHaveBeenCalled();
      expect(execMock).toHaveBeenCalledWith(expect.any(Array), expect.any(Function));
      expect(result).toEqual({ insertId: 1 });
    });

    it('debería rechazar en caso de error', async () => {
      const error = new Error('Insert error');
      db.prepare.mockImplementation((query, cb) => cb(error));

      await expect(OrdenesModel.create({})).rejects.toThrow('Insert error');
    });
  });

  // Tests similares pueden hacerse para update, updateEstado y delete

  describe('update', () => {
    it('debería actualizar la orden correctamente', async () => {
      const execMock = jest.fn((params, cb) => cb(null));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      const updatedOrden = {
        usuario_id: 1,
        estado_id: 2,
        proveedor_id: 3,
        producto_id: 4,
        cantidad: 20,
        precio_unitario: 200,
        costo_total: 4000,
        sugerida_por_ia: true
      };

      const result = await OrdenesModel.update(1, updatedOrden);

      expect(db.prepare).toHaveBeenCalled();
      expect(execMock).toHaveBeenCalledWith(expect.any(Array), expect.any(Function));
      expect(result).toBe(true);
    });

    it('debería rechazar en caso de error', async () => {
      const error = new Error('Update error');
      db.prepare.mockImplementation((query, cb) => cb(error));

      await expect(OrdenesModel.update(1, {})).rejects.toThrow('Update error');
    });
  });

  describe('updateEstado', () => {
    it('debería actualizar el estado correctamente', async () => {
      const execMock = jest.fn((params, cb) => cb(null));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      const result = await OrdenesModel.updateEstado(1, 5);

      expect(db.prepare).toHaveBeenCalled();
      expect(execMock).toHaveBeenCalledWith([5, 1], expect.any(Function));
      expect(result).toBe(true);
    });

    it('debería rechazar en caso de error', async () => {
      const error = new Error('Update estado error');
      db.prepare.mockImplementation((query, cb) => cb(error));

      await expect(OrdenesModel.updateEstado(1, 5)).rejects.toThrow('Update estado error');
    });
  });

  describe('delete', () => {
    it('debería eliminar la orden correctamente', async () => {
      const execMock = jest.fn((params, cb) => cb(null));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      const result = await OrdenesModel.delete(1);

      expect(db.prepare).toHaveBeenCalled();
      expect(execMock).toHaveBeenCalledWith([1], expect.any(Function));
      expect(result).toBe(true);
    });

    it('debería rechazar en caso de error', async () => {
      const error = new Error('Delete error');
      db.prepare.mockImplementation((query, cb) => cb(error));

      await expect(OrdenesModel.delete(1)).rejects.toThrow('Delete error');
    });
  });

  describe('getAllEstadosDisponibles', () => {
    it('debería devolver todos los estados disponibles', async () => {
      const mockResult = [{ id: 1, nombre: 'Pendiente' }, { id: 2, nombre: 'Completado' }];
      db.exec.mockImplementation((query, cb) => cb(null, mockResult));

      const result = await OrdenesModel.getAllEstadosDisponibles();

      expect(db.exec).toHaveBeenCalledWith("SELECT * FROM Estados_ordenes", expect.any(Function));
      expect(result).toEqual(mockResult);
    });

    it('debería rechazar en caso de error', async () => {
      const error = new Error('DB error');
      db.exec.mockImplementation((query, cb) => cb(error));

      await expect(OrdenesModel.getAllEstadosDisponibles()).rejects.toThrow('DB error');
    });
  });

});