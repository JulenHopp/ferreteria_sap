// __tests__/models/productosModel.test.js

jest.mock('../../src/config/db', () => ({
  exec: jest.fn(),
  prepare: jest.fn()
}));

const db = require('../../src/config/db');
const productosModel = require('../../src/models/productosModel');

describe('productosModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('debería devolver todos los productos', async () => {
      const mockResult = [{ id: 1, nombre: 'Producto1' }, { id: 2 }];
      db.exec.mockImplementation((query, cb) => cb(null, mockResult));

      const result = await productosModel.getAll();

      expect(db.exec).toHaveBeenCalledWith("SELECT * FROM Productos", expect.any(Function));
      expect(result).toEqual(mockResult);
    });

    it('debería rechazar en caso de error', async () => {
      const error = new Error('DB error');
      db.exec.mockImplementation((query, cb) => cb(error));

      await expect(productosModel.getAll()).rejects.toThrow('DB error');
    });
  });

  describe('create', () => {
    it('debería insertar un nuevo producto correctamente', async () => {
      const execMock = jest.fn((params, cb) => cb(null, { insertId: 10 }));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      const newProducto = {
        nombre: 'ProductoNuevo',
        descripcion: 'Descripción',
        precio_unitario: 100,
        proveedor_id: 1,
        categoria_id: 2,
      };

      const result = await productosModel.create(newProducto);

      expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO Productos"), expect.any(Function));
      expect(execMock).toHaveBeenCalledWith(
        [newProducto.nombre, newProducto.descripcion, newProducto.precio_unitario, newProducto.proveedor_id, newProducto.categoria_id],
        expect.any(Function)
      );
      expect(result).toEqual({ insertId: 10 });
    });

    it('debería rechazar en caso de error en prepare', async () => {
      const error = new Error('Prepare error');
      db.prepare.mockImplementation((query, cb) => cb(error));

      await expect(productosModel.create({})).rejects.toThrow('Prepare error');
    });

    it('debería rechazar en caso de error en exec', async () => {
      const error = new Error('Exec error');
      const execMock = jest.fn((params, cb) => cb(error));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      await expect(productosModel.create({
        nombre: 'x',
        descripcion: 'x',
        precio_unitario: 0,
        proveedor_id: 0,
        categoria_id: 0,
      })).rejects.toThrow('Exec error');
    });
  });

  describe('updateById', () => {
    it('debería actualizar un producto por id correctamente', async () => {
      const execMock = jest.fn((params, cb) => cb(null, { changes: 1 }));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      const result = await productosModel.updateById(1, { nombre: 'NuevoNombre', categoria_id: 5 });

      expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining("UPDATE Productos"), expect.any(Function));
      expect(execMock).toHaveBeenCalledWith(['NuevoNombre', 5, 1], expect.any(Function));
      expect(result).toEqual({ changes: 1 });
    });

    it('debería rechazar en caso de error en prepare', async () => {
      const error = new Error('Prepare error');
      db.prepare.mockImplementation((query, cb) => cb(error));

      await expect(productosModel.updateById(1, {})).rejects.toThrow('Prepare error');
    });

    it('debería rechazar en caso de error en exec', async () => {
      const error = new Error('Exec error');
      const execMock = jest.fn((params, cb) => cb(error));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      await expect(productosModel.updateById(1, { nombre: 'x', categoria_id: 1 })).rejects.toThrow('Exec error');
    });
  });

  describe('getAllCategorias', () => {
    it('debería devolver todas las categorías', async () => {
      const mockResult = [{ id: 1, nombre: 'Cat1' }, { id: 2 }];
      db.exec.mockImplementation((query, cb) => cb(null, mockResult));

      const result = await productosModel.getAllCategorias();

      expect(db.exec).toHaveBeenCalledWith("SELECT * FROM Categorias", expect.any(Function));
      expect(result).toEqual(mockResult);
    });

    it('debería rechazar en caso de error', async () => {
      const error = new Error('DB error');
      db.exec.mockImplementation((query, cb) => cb(error));

      await expect(productosModel.getAllCategorias()).rejects.toThrow('DB error');
    });
  });

  describe('createCategory', () => {
    it('debería insertar una nueva categoría correctamente', async () => {
      const execMock = jest.fn((params, cb) => cb(null, { insertId: 99 }));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      const nombre = 'NuevaCategoria';

      const result = await productosModel.createCategory(nombre);

      expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO Categorias"), expect.any(Function));
      expect(execMock).toHaveBeenCalledWith([nombre], expect.any(Function));
      expect(result).toEqual({ insertId: 99 });
    });

    it('debería rechazar en caso de error en prepare', async () => {
      const error = new Error('Prepare error');
      db.prepare.mockImplementation((query, cb) => cb(error));

      await expect(productosModel.createCategory('test')).rejects.toThrow('Prepare error');
    });

    it('debería rechazar en caso de error en exec', async () => {
      const error = new Error('Exec error');
      const execMock = jest.fn((params, cb) => cb(error));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      await expect(productosModel.createCategory('test')).rejects.toThrow('Exec error');
    });
  });
});