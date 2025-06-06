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

// Mock ordenesSugeridadIaModel before importing
jest.mock('../../src/models/ordenesSugeridasIaModel', () => ({
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

const ordenesSugeridadIaModel = require('../../src/models/ordenesSugeridasIaModel');
const ordenesSugeridadIaController = require('../../src/controllers/ordenesSugeridasIaController');

describe('AI Order Suggestions Management', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    // Mock request and response objects
    mockReq = {
      body: {
        producto_id: 1,
        cantidad_sugerida: 10,
        razon: 'Stock bajo',
        estado_id: 1,
        proveedor_id: 1
      }
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('Get All Suggested Orders', () => {
    it('should get all suggested orders successfully', async () => {
      const mockSuggestedOrders = [
        { 
          ID: 1, 
          PRODUCTO_ID: 1, 
          CANTIDAD_SUGERIDA: 10, 
          RAZON: 'Stock bajo',
          ESTADO_ID: 1,
          PROVEEDOR_ID: 1,
          FECHA: '2024-03-20'
        },
        { 
          ID: 2, 
          PRODUCTO_ID: 2, 
          CANTIDAD_SUGERIDA: 5, 
          RAZON: 'Demanda alta',
          ESTADO_ID: 1,
          PROVEEDOR_ID: 2,
          FECHA: '2024-03-20'
        }
      ];

      ordenesSugeridadIaModel.getAll.mockResolvedValue(mockSuggestedOrders);

      await ordenesSugeridadIaController.getAllOrdenes(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockSuggestedOrders);
    });

    it('should handle error when getting suggested orders', async () => {
      const mockError = new Error('Database error');
      ordenesSugeridadIaModel.getAll.mockRejectedValue(mockError);

      await ordenesSugeridadIaController.getAllOrdenes(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('Create Suggested Order', () => {
    it('should create suggested order successfully', async () => {
      ordenesSugeridadIaModel.create.mockResolvedValue({ affectedRows: 1 });

      await ordenesSugeridadIaController.createOrden(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Orden sugerida creada correctamente' });
    });

    it('should handle error when creating suggested order', async () => {
      const mockError = new Error('Database error');
      ordenesSugeridadIaModel.create.mockRejectedValue(mockError);

      await ordenesSugeridadIaController.createOrden(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });
}); 