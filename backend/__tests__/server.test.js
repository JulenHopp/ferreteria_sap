const request = require('supertest');
const express = require('express');
const cors = require('cors');
const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5173/ferreteria_sap'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

describe('Server Health Check', () => {
  it('should return 200 OK for health check endpoint', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
}); 