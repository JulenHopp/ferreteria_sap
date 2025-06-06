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

// Mock ventasModel before importing
jest.mock('../../src/models/ventasModel', () => ({
  getAll: jest.fn(),
  create: jest.fn()
}));

beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});

const ventasModel = require('../../src/models/ventasModel');
const ventasController = require('../../src/controllers/ventasController');

describe('Sales Management', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    // Mock request and response objects
    mockReq = {
      body: {
        producto_id: 1,
        cantidad: 2,
        precio_unitario: 100,
        total: 200
      }
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('Get All Sales', () => {
    it('should get all sales successfully', async () => {
      const mockSales = [
        { 
          ID: 1, 
          PRODUCTO_ID: 1, 
          CANTIDAD: 2, 
          PRECIO_UNITARIO: 100, 
          TOTAL: 200,
          FECHA: '2024-03-20'
        },
        { 
          ID: 2, 
          PRODUCTO_ID: 2, 
          CANTIDAD: 1, 
          PRECIO_UNITARIO: 150, 
          TOTAL: 150,
          FECHA: '2024-03-20'
        }
      ];

      ventasModel.getAll.mockResolvedValue(mockSales);

      await ventasController.getAllVentas(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockSales);
    });

    it('should handle error when getting sales', async () => {
      const mockError = new Error('Database error');
      ventasModel.getAll.mockRejectedValue(mockError);

      await ventasController.getAllVentas(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('Create Sale', () => {
    it('should create sale successfully', async () => {
      ventasModel.create.mockResolvedValue({ affectedRows: 1 });

      await ventasController.createVenta(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Venta registrada correctamente' });
    });

    it('should handle error when creating sale', async () => {
      const mockError = new Error('Database error');
      ventasModel.create.mockRejectedValue(mockError);

      await ventasController.createVenta(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });
}); 