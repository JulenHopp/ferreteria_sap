// routes/usuarioRoutes.js
const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuariosController");

router.get("/", UsuarioController.getAllUsuarios);
router.post("/", UsuarioController.createUsuario);

module.exports = router;
