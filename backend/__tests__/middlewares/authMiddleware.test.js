// auth.test.js
process.env.CLAVE_TOKEN = 'test_secret'; // 👈 Define esto antes de requerir el middleware

const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');

const { authMiddleware } = require('../../src/middlewares/authMiddleware');

const app = express();
app.use(express.json());

app.get('/protegido', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Acceso concedido', user: req.user });
});

describe('authMiddleware', () => {
  it('debe rechazar si no se envía token', async () => {
    const res = await request(app).get('/protegido');
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Token requerido' });
  });

  it('debe rechazar si el token es inválido', async () => {
    const res = await request(app)
      .get('/protegido')
      .set('Authorization', 'Bearer token_invalido');

    expect(res.status).toBe(403);
    expect(res.body).toEqual({ error: 'Token inválido o expirado' });
  });

  it('debe permitir acceso si el token es válido', async () => {
    const payload = { id: 1, name: 'Usuario Test' };
    const token = jwt.sign(payload, process.env.CLAVE_TOKEN);

    const res = await request(app)
      .get('/protegido')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: 'Acceso concedido',
      user: payload,
    });
  });
});