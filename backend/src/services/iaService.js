// services/iaService.js
const inventarioModel = require('../models/inventarioModel');
const ordenesSugeridadIaModel = require('../models/ordenesSugeridasIaModel');
const axios = require('axios');

const iaService = {
  generarPredicciones: async () => {
    try {
      // 1. Extraer datos desde SAP HANA (campos en MAYÚSCULAS)
      const inventario = await inventarioModel.getAllForIa();

      // 2. Mapear a las claves requeridas por el modelo IA (minúsculas)
      const datosModelo = inventario.map(item => ({
        producto_id: item.PRODUCTO_ID,
        stock_actual: item.STOCK_ACTUAL,
        ventas_mensuales: item.VENTAS_MENSUALES,
        veces_ordenado: item.VECES_ORDENADO,
        promedio_ordenado: item.PROMEDIO_ORDENADO,
        cantidad_sugerida: item.CANTIDAD_SUGERIDA,
        precio_unitario: item.PRECIO_UNITARIO,
        proveedor_id: item.PROVEEDOR_ID,
        nombre_producto: item.NOMBRE_PRODUCTO,
        nombre_proveedor: item.NOMBRE_PROVEEDOR,
        categoria: item.CATEGORIA,
        ubicacion: item.UBICACION,
        descripcion: item.DESCRIPCION
      }));

      // 3. Enviar al endpoint de predicción
      const response  = await axios.post('http://localhost:8000/predict', datosModelo);
      const predicciones = await response.data;

      // 4. Guardar solo los productos con refill sugerido
      const resultados = [];

      for (const pred of predicciones) {
        if (pred.prediction === 1 && pred.cantidad_sugerida > 0) {
          await ordenesSugeridadIaModel.create({
            producto_id: pred.producto_id,
            cantidad_sugerida: pred.cantidad_sugerida,
            razon: pred.razon || 'IA recomendó refill',
            estado_id: 1,
            proveedor_id: pred.proveedor_id
          });
          resultados.push(pred);
        }
      }

      return resultados;
    } catch (error) {
      console.error('Error en iaService.generarPredicciones:', error.message);
      throw error;
    }
  }
};

module.exports = iaService;