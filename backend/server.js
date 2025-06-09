const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const allowedOrigin = process.env.FRONT_URL || 'http://localhost:5173';

app.use(cors({
    origin: [allowedOrigin],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

const ordenesRoutes = require("./src/routes/ordenesRoutes");
const usuarioRoutes = require("./src/routes/usuariosRoutes");
const proveedorRoutes = require("./src/routes/proveedoresRoutes");
const productosRoutes = require("./src/routes/productosRoutes");
const ordenesSugeridadIaRoutes = require("./src/routes/ordenesSugeridasIaRoutes");
const inventarioRoutes = require("./src/routes/inventarioRoutes");
const ventasRoutes = require("./src/routes/ventasRoutes");
const authRoutes = require("./src/routes/authRoutes");
const predictRoutes = require("./routes/predict");


app.use(express.json());

app.use("/api/ordenes", ordenesRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/ordenes-sugeridad-ia", ordenesSugeridadIaRoutes);
app.use("/api/inventario", inventarioRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", predictRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
