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

// Mock proveedoresModel before importing
jest.mock('../src/models/proveedoresModel', () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));

beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});

const proveedoresModel = require('../src/models/proveedoresModel');
const proveedoresController = require('../src/controllers/proveedoresController');

describe('Supplier Management', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    // Mock request and response objects
    mockReq = {
      body: {
        nombre: 'Test Supplier',
        correo: 'test@supplier.com',
        telefono: '1234567890'
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

  describe('Get All Suppliers', () => {
    it('should get all suppliers successfully', async () => {
      const mockSuppliers = [
        { ID: 1, NOMBRE: 'Supplier 1', CORREO: 'supplier1@test.com', TELEFONO: '1234567890' },
        { ID: 2, NOMBRE: 'Supplier 2', CORREO: 'supplier2@test.com', TELEFONO: '0987654321' }
      ];

      proveedoresModel.getAll.mockResolvedValue(mockSuppliers);

      await proveedoresController.getAllProveedores(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockSuppliers);
    });

    it('should handle error when getting suppliers', async () => {
      const mockError = new Error('Database error');
      proveedoresModel.getAll.mockRejectedValue(mockError);

      await proveedoresController.getAllProveedores(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('Get Supplier By ID', () => {
    it('should get supplier by id successfully', async () => {
      const mockSupplier = { ID: 1, NOMBRE: 'Test Supplier', CORREO: 'test@supplier.com', TELEFONO: '1234567890' };
      proveedoresModel.getById.mockResolvedValue(mockSupplier);

      await proveedoresController.getProveedorById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockSupplier);
    });

    it('should return 404 when supplier not found', async () => {
      proveedoresModel.getById.mockResolvedValue(null);

      await proveedoresController.getProveedorById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Proveedor no encontrado' });
    });

    it('should handle error when getting supplier', async () => {
      const mockError = new Error('Database error');
      proveedoresModel.getById.mockRejectedValue(mockError);

      await proveedoresController.getProveedorById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('Create Supplier', () => {
    it('should create supplier successfully', async () => {
      proveedoresModel.create.mockResolvedValue({ affectedRows: 1 });

      await proveedoresController.createProveedor(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Proveedor creado correctamente' });
    });

    it('should handle error when creating supplier', async () => {
      const mockError = new Error('Database error');
      proveedoresModel.create.mockRejectedValue(mockError);

      await proveedoresController.createProveedor(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('Update Supplier', () => {
    it('should update supplier successfully', async () => {
      proveedoresModel.update.mockResolvedValue({ affectedRows: 1 });

      await proveedoresController.updateProveedor(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Proveedor actualizado correctamente' });
    });

    it('should return 404 when supplier not found', async () => {
      proveedoresModel.update.mockResolvedValue(null);

      await proveedoresController.updateProveedor(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Proveedor no encontrado' });
    });

    it('should handle error when updating supplier', async () => {
      const mockError = new Error('Database error');
      proveedoresModel.update.mockRejectedValue(mockError);

      await proveedoresController.updateProveedor(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('Delete Supplier', () => {
    it('should delete supplier successfully', async () => {
      proveedoresModel.delete.mockResolvedValue({ affectedRows: 1 });

      await proveedoresController.deleteProveedor(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Proveedor eliminado correctamente' });
    });

    it('should return 404 when supplier not found', async () => {
      proveedoresModel.delete.mockResolvedValue(null);

      await proveedoresController.deleteProveedor(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Proveedor no encontrado' });
    });

    it('should handle error when deleting supplier', async () => {
      const mockError = new Error('Database error');
      proveedoresModel.delete.mockRejectedValue(mockError);

      await proveedoresController.deleteProveedor(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });
}); 