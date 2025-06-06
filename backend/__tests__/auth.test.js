// Mock console.error and console.log
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

// Mock environment variables before any imports
process.env.HANA_HOST = 'test-host';
process.env.HANA_USER = 'test-user';
process.env.HANA_PASSWORD = 'test-password';
process.env.CLAVE_TOKEN = 'test-secret-key';

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
jest.mock('jsonwebtoken');

// Mock usuariosModel before importing
jest.mock('../src/models/usuariosModel', () => ({
  getByEmail: jest.fn()
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
const jwt = require('jsonwebtoken');
const usuariosModel = require('../src/models/usuariosModel');
const authController = require('../src/controllers/authController');

describe('Authentication', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    // Mock request and response objects
    mockReq = {
      body: {
        correo: 'pruebas@gmail.com',
        contrasena: '1234'
      }
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('Login', () => {
    it('should login successfully with valid credentials', async () => {
      // Mock user data
      const mockUser = {
        ID: 1,
        CORREO: 'pruebas@gmail.com',
        CONTRASENA: 'hashed_password',
        ROL_ID: 1
      };

      // Mock successful password comparison
      bcrypt.compare.mockResolvedValue(true);

      // Mock successful user retrieval
      usuariosModel.getByEmail.mockResolvedValue(mockUser);

      // Mock JWT sign
      jwt.sign.mockReturnValue('mock-token');

      // Call login function
      await authController.login(mockReq, mockRes);

      // Verify the response
      expect(mockRes.json).toHaveBeenCalledWith({
        token: 'mock-token',
        rol_id: mockUser.ROL_ID,
        user_id: mockUser.ID
      });
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should reject login with invalid email', async () => {
      // Mock user not found
      usuariosModel.getByEmail.mockResolvedValue(null);

      // Call login function
      await authController.login(mockReq, mockRes);

      // Verify the response
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Usuario o contraseña incorrecta'
      });
    });

    it('should reject login with invalid password', async () => {
      // Mock user found but wrong password
      const mockUser = {
        ID: 1,
        CORREO: 'pruebas@gmail.com',
        CONTRASENA: 'hashed_password',
        ROL_ID: 1
      };

      usuariosModel.getByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      // Call login function
      await authController.login(mockReq, mockRes);

      // Verify the response
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Usuario o contraseña incorrecta'
      });
    });

    it('should handle database errors gracefully', async () => {
      // Mock database error
      usuariosModel.getByEmail.mockImplementation(() => {
        throw new Error('Database error');
      });

      // Call login function
      await authController.login(mockReq, mockRes);

      // Verify error handling
      expect(console.error).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });
}); 