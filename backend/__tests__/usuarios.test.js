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

jest.mock('bcrypt');

// Mock usuariosModel before importing
jest.mock('../src/models/usuariosModel', () => ({
  getAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getAllRoles: jest.fn()
}));

beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});

const bcrypt = require('bcrypt');
const usuariosModel = require('../src/models/usuariosModel');
const usuariosController = require('../src/controllers/usuariosController');

describe('User Management', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    // Mock request and response objects
    mockReq = {
      body: {
        nombre: 'Test User',
        correo: 'test@example.com',
        contrasena: 'password123',
        rol_id: 1
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

  describe('Get All Users', () => {
    it('should get all users successfully', async () => {
      const mockUsers = [
        { ID: 1, NOMBRE: 'User 1', CORREO: 'user1@example.com' },
        { ID: 2, NOMBRE: 'User 2', CORREO: 'user2@example.com' }
      ];

      usuariosModel.getAll.mockResolvedValue(mockUsers);

      await usuariosController.getAllUsuarios(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
    });
  });

  describe('Create User', () => {
    it('should create a user successfully', async () => {
      bcrypt.hash.mockResolvedValue('hashed_password');
      usuariosModel.create.mockResolvedValue({ affectedRows: 1 });

      await usuariosController.createUsuario(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Usuario creado correctamente' });
    });
  });

  describe('Update User', () => {
    it('should update a user successfully', async () => {
      usuariosModel.update.mockResolvedValue({ affectedRows: 1 });

      await usuariosController.updateUsuario(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Usuario actualizado correctamente' });
    });
  });

  describe('Delete User', () => {
    it('should delete a user successfully', async () => {
      usuariosModel.delete.mockResolvedValue({ affectedRows: 1 });

      await usuariosController.deleteUsuario(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Usuario eliminado correctamente' });
    });
  });

  describe('Get Roles', () => {
    it('should get all roles successfully', async () => {
      const mockRoles = [
        { ID: 1, NOMBRE: 'Admin' },
        { ID: 2, NOMBRE: 'User' }
      ];

      usuariosModel.getAllRoles.mockResolvedValue(mockRoles);

      await usuariosController.getRoles(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockRoles);
    });
  });
}); 