// routes/usuarioRoutes.js
const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuariosController");
// const {authMiddleware} = require("../middlewares/authMiddleware");

router.get("/", UsuarioController.getAllUsuarios);
router.post("/", UsuarioController.createUsuario);
router.get("/roles", UsuarioController.getRoles);
router.put("/:id", UsuarioController.updateUsuario);
router.delete("/:id", UsuarioController.deleteUsuario);

module.exports = router;
