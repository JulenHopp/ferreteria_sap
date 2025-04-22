const express = require('express');
const app = express();
require('dotenv').config();

const ordenesRoutes = require('./src/routes/ordenes.routes');

app.use(express.json());
app.use('/api/ordenes', ordenesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});