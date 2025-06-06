const request = require('supertest');
const express = require('express');
const authRoutes = require('../../src/routes/authRoutes');
const authController = require('../../src/controllers/authController');

// Mock the auth controller
jest.mock('../../src/controllers/authController', () => ({
  login: jest.fn()
}));

describe('Authentication Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/auth', authRoutes);
    jest.clearAllMocks();
  });

  describe('POST /api/auth/login', () => {
    it('should handle successful login', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        token: 'mock-token'
      };

      authController.login.mockImplementation((req, res) => {
        res.status(200).json(mockUser);
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
      expect(authController.login).toHaveBeenCalledTimes(1);
    });

    it('should handle login with invalid credentials', async () => {
      authController.login.mockImplementation((req, res) => {
        res.status(401).json({ error: 'Invalid credentials' });
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid credentials' });
      expect(authController.login).toHaveBeenCalledTimes(1);
    });

    it('should handle missing credentials', async () => {
      authController.login.mockImplementation((req, res) => {
        res.status(401).json({ error: 'Missing credentials' });
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({});

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Missing credentials' });
      expect(authController.login).toHaveBeenCalledTimes(1);
    });

    it('should handle server errors', async () => {
      authController.login.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Internal server error' });
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
      expect(authController.login).toHaveBeenCalledTimes(1);
    });
  });
}); 