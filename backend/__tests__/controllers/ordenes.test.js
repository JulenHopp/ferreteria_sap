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

// Mock ordenesModel before importing
jest.mock('../../src/models/ordenesModel', () => ({
  getAll: jest.fn(),
  getAllWithDetails: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  updateEstado: jest.fn(),
  delete: jest.fn(),
  getAllEstadosDisponibles: jest.fn()
}));

beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});

const ordenesModel = require('../../src/models/ordenesModel');
const ordenesController = require('../../src/controllers/ordenesController');

describe('Order Management', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    // Mock request and response objects
    mockReq = {
      body: {
        cliente_id: 1,
        productos: [
          { producto_id: 1, cantidad: 2 },
          { producto_id: 2, cantidad: 1 }
        ],
        estado_id: 1
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

  describe('Get All Orders', () => {
    it('should get all orders successfully', async () => {
      const mockOrders = [
        { ID: 1, CLIENTE_ID: 1, ESTADO_ID: 1 },
        { ID: 2, CLIENTE_ID: 2, ESTADO_ID: 2 }
      ];

      ordenesModel.getAll.mockResolvedValue(mockOrders);

      await ordenesController.getOrdenes(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockOrders);
    });
  });

  describe('Get Orders With Details', () => {
    it('should get all orders with details successfully', async () => {
      const mockOrdersWithDetails = [
        { 
          ID: 1, 
          CLIENTE_ID: 1, 
          ESTADO_ID: 1,
          CLIENTE_NOMBRE: 'John Doe',
          ESTADO_NOMBRE: 'Pendiente'
        }
      ];

      ordenesModel.getAllWithDetails.mockResolvedValue(mockOrdersWithDetails);

      await ordenesController.getOrdenesWithDetails(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockOrdersWithDetails);
    });
  });

  describe('Get Order By ID', () => {
    it('should get order by id successfully', async () => {
      const mockOrder = { ID: 1, CLIENTE_ID: 1, ESTADO_ID: 1 };
      ordenesModel.getById.mockResolvedValue(mockOrder);

      await ordenesController.getOrdenById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockOrder);
    });

    it('should return 404 when order not found', async () => {
      ordenesModel.getById.mockResolvedValue(null);

      await ordenesController.getOrdenById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Orden no encontrada' });
    });
  });

  describe('Create Order', () => {
    it('should create order successfully', async () => {
      ordenesModel.create.mockResolvedValue({ affectedRows: 1 });

      await ordenesController.createOrden(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Orden creada correctamente' });
    });
  });

  describe('Update Order', () => {
    it('should update order successfully', async () => {
      ordenesModel.update.mockResolvedValue({ affectedRows: 1 });

      await ordenesController.updateOrden(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Orden actualizada correctamente' });
    });

    it('should return 404 when order not found', async () => {
      ordenesModel.update.mockResolvedValue(null);

      await ordenesController.updateOrden(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Orden no encontrada' });
    });
  });

  describe('Update Order Status', () => {
    it('should update order status successfully', async () => {
      ordenesModel.updateEstado.mockResolvedValue({ affectedRows: 1 });

      await ordenesController.updateEstado(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Estado actualizado correctamente' });
    });

    it('should return 404 when order not found', async () => {
      ordenesModel.updateEstado.mockResolvedValue(null);

      await ordenesController.updateEstado(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Orden no encontrada' });
    });
  });

  describe('Delete Order', () => {
    it('should delete order successfully', async () => {
      ordenesModel.delete.mockResolvedValue({ affectedRows: 1 });

      await ordenesController.deleteOrden(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Orden eliminada correctamente' });
    });

    it('should return 404 when order not found', async () => {
      ordenesModel.delete.mockResolvedValue(null);

      await ordenesController.deleteOrden(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Orden no encontrada' });
    });
  });

  describe('Get Available Statuses', () => {
    it('should get all available statuses successfully', async () => {
      const mockStatuses = [
        { ID: 1, NOMBRE: 'Pendiente' },
        { ID: 2, NOMBRE: 'Completada' }
      ];

      ordenesModel.getAllEstadosDisponibles.mockResolvedValue(mockStatuses);

      await ordenesController.getEstadosDisponibles(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockStatuses);
    });
  });
}); 