// Mock console.error and console.log
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

// Mock environment variables before any imports
process.env.HANA_HOST = 'test-host';
process.env.HANA_USER = 'test-user';
process.env.HANA_PASSWORD = 'test-password';

// Mock dependencies before importing any modules
jest.mock('@sap/hana-client', () => ({
  createConnection: () => ({
    connect: (config, callback) => callback(null),
    exec: (query, callback) => callback(null, []),
    prepare: (query, callback) => callback(null, {
      exec: (params, callback) => callback(null, [])
    })
  })
}));

// Mock productosModel before importing
jest.mock('../../src/models/productosModel', () => ({
  getAll: jest.fn(),
  create: jest.fn(),
  updateById: jest.fn(),
  getAllCategorias: jest.fn(),
  createCategory: jest.fn()
}));

beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});

const productosModel = require('../../src/models/productosModel');
const productosController = require('../../src/controllers/productosController');

describe('Product Management', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    // Mock request and response objects
    mockReq = {
      body: {
        nombre: 'Test Product',
        descripcion: 'Test Description',
        precio_unitario: 100.00,
        proveedor_id: 1,
        categoria_id: 1
      },
      params: {
        id: '1'
      }
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('Get All Products', () => {
    it('should get all products successfully', async () => {
      const mockProducts = [
        { ID: 1, NOMBRE: 'Product 1', PRECIO_UNITARIO: 100.00 },
        { ID: 2, NOMBRE: 'Product 2', PRECIO_UNITARIO: 200.00 }
      ];

      productosModel.getAll.mockResolvedValue(mockProducts);

      await productosController.getAllProductos(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
    });
  });

  describe('Create Product', () => {
    it('should create a product successfully', async () => {
      productosModel.create.mockResolvedValue({ affectedRows: 1 });

      await productosController.createProducto(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Producto creado correctamente' });
    });
  });

  describe('Update Product', () => {
    it('should update a product successfully', async () => {
      productosModel.updateById.mockResolvedValue({ affectedRows: 1 });

      await productosController.updateProducto(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Producto actualizado correctamente' });
    });
  });

  describe('Get Categories', () => {
    it('should get all categories successfully', async () => {
      const mockCategories = [
        { ID: 1, NOMBRE: 'Category 1' },
        { ID: 2, NOMBRE: 'Category 2' }
      ];

      productosModel.getAllCategorias.mockResolvedValue(mockCategories);

      await productosController.getCategorias(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockCategories);
    });
  });

  describe('Create Category', () => {
    it('should create a category successfully', async () => {
      mockReq.body = { nombre: 'New Category' };
      productosModel.createCategory.mockResolvedValue({ affectedRows: 1 });

      await productosController.createCategory(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Categoria creada correctamente' });
    });
  });
}); 