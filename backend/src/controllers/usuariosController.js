// controllers/usuarioController.js
const UsuarioModel = require("../models/usuariosModel");

const UsuarioController = {
  getAllUsuarios: async (req, res) => {
    try {
      const usuarios = await UsuarioModel.getAll();
      res.status(200).json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createUsuario: async (req, res) => {
    try {
      const { nombre, correo, contrasena, rol_id } = req.body;
      await UsuarioModel.create({ nombre, correo, contrasena, rol_id });
      res.status(201).json({ message: "Usuario creado correctamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getRoles: async (req, res) => {
    try {
      const roles = await UsuarioModel.getAllRoles();
      res.status(201).json(roles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = UsuarioController;
