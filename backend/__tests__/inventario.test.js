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

// Mock inventarioModel before importing
jest.mock('../src/models/inventarioModel', () => ({
  getAll: jest.fn(),
  getAllWithDetails: jest.fn(),
  create: jest.fn(),
  updateCantidad: jest.fn(),
  updateUbicacion: jest.fn(),
  updateInventoryAndProductDetails: jest.fn()
}));

beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});

const inventarioModel = require('../src/models/inventarioModel');
const inventarioController = require('../src/controllers/inventarioController');

describe('Inventory Management', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    // Mock request and response objects
    mockReq = {
      body: {
        producto_id: 1,
        cantidad: 100,
        ubicacion: 'A1',
        inventario_id: 1,
        nombre: 'Test Product',
        categoria_id: 1,
        descripcion: 'Test Description',
        precio_unitario: 100.00
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

  describe('Get All Inventory', () => {
    it('should get all inventory successfully', async () => {
      const mockInventory = [
        { ID: 1, PRODUCTO_ID: 1, CANTIDAD: 100, UBICACION: 'A1' },
        { ID: 2, PRODUCTO_ID: 2, CANTIDAD: 200, UBICACION: 'B1' }
      ];

      inventarioModel.getAll.mockResolvedValue(mockInventory);

      await inventarioController.getAllInventario(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockInventory);
    });
  });

  describe('Get All Inventory With Details', () => {
    it('should get all inventory with details successfully', async () => {
      const mockInventoryWithDetails = [
        { 
          ID: 1, 
          PRODUCTO_ID: 1, 
          CANTIDAD: 100, 
          UBICACION: 'A1',
          NOMBRE: 'Product 1',
          PRECIO: 100.00
        }
      ];

      inventarioModel.getAllWithDetails.mockResolvedValue(mockInventoryWithDetails);

      await inventarioController.getAllInventarioWithDetails(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockInventoryWithDetails);
    });
  });

  describe('Create Inventory', () => {
    it('should create inventory successfully', async () => {
      inventarioModel.create.mockResolvedValue({ affectedRows: 1 });

      await inventarioController.createInventario(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        message: 'Registro de inventario creado correctamente' 
      });
    });
  });

  describe('Update Quantity', () => {
    it('should update quantity successfully', async () => {
      inventarioModel.updateCantidad.mockResolvedValue({ affectedRows: 1 });

      await inventarioController.updateCantidad(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        message: 'Registro de inventario actualizado exitosamente' 
      });
    });

    it('should reject invalid quantity', async () => {
      mockReq.body.cantidad = -1;

      await inventarioController.updateCantidad(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        error: 'Datos ingresados no validos' 
      });
    });
  });

  describe('Update Location', () => {
    it('should update location successfully', async () => {
      inventarioModel.updateUbicacion.mockResolvedValue({ affectedRows: 1 });

      await inventarioController.updateUbicacion(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        message: 'Cambio de ubicacion realizado exitosamente' 
      });
    });

    it('should reject invalid location', async () => {
      mockReq.body.ubicacion = '';

      await inventarioController.updateUbicacion(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        error: 'producto o ubicacion no valida' 
      });
    });
  });

  describe('Update Inventory and Product', () => {
    it('should update inventory and product successfully', async () => {
      inventarioModel.updateInventoryAndProductDetails.mockResolvedValue({ affectedRows: 1 });

      await inventarioController.updateInventarioAndProducto(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        message: 'Inventario y producto actualizados correctamente' 
      });
    });

    it('should reject missing required fields', async () => {
      mockReq.body = {};

      await inventarioController.updateInventarioAndProducto(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        error: 'Faltan campos requeridos en el body' 
      });
    });
  });
}); 