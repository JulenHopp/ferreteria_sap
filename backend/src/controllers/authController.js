const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuariosModel = require('../models/usuariosModel');
require('dotenv').config();

const SECRET_KEY = process.env.CLAVE_TOKEN;

exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;
   
  const user = await usuariosModel.getByEmail(correo);
  if (!user) return res.status(404).json({ error: 'Usuario o contraseña incorrecta' });

  const match = await bcrypt.compare(contrasena, user.CONTRASENA);
  if (!match) return res.status(401).json({ error: 'Usuario o contraseña incorrecta' });

  const token = jwt.sign({ id: user.ID, correo: user.CORREO, rol_id: user.ROL_ID }, SECRET_KEY, { expiresIn: '7d' });
  res.json({ token });
};
