const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');

router.post('/predict', async (req, res) => {
    try {
        // Obtener datos del body
        const { 
            stock_actual, 
            ventas_mensuales, 
            veces_ordenado, 
            promedio_ordenado, 
            cantidad_sugerida,
            precio_unitario,
            proveedor_id 
        } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if ([stock_actual, ventas_mensuales, veces_ordenado, promedio_ordenado, cantidad_sugerida, precio_unitario].some(v => v === undefined)) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        // Crear objeto solo con las columnas que espera el modelo
        const modelInputData = {
            stock_actual,
            ventas_mensuales,
            veces_ordenado,
            promedio_ordenado,
            cantidad_sugerida
        };

        // Convertir a JSON string
        const inputJson = JSON.stringify(modelInputData);

        // Ruta al script de Python
        const pythonScript = path.resolve(__dirname, '..', '..', 'ai', 'predict.py');

        // Ejecutar script de Python
        const pythonProcess = spawn('python3', [pythonScript, inputJson]);

        // Configurar encoding
        pythonProcess.stdout.setEncoding('utf8');
        pythonProcess.stderr.setEncoding('utf8');

        let prediction = '';
        let error = '';

        // Capturar salida estándar
        pythonProcess.stdout.on('data', (data) => {
            prediction += data.toString();
        });

        // Capturar errores
        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
        });

        // Cuando el proceso termina
        pythonProcess.on('close', (code) => {
            // Debug logs
            console.log('Process exited with code:', code);
            console.log('Prediction:', prediction);
            console.log('Error:', error);

            if (code !== 0) {
                return res.status(500).json({ error: error || 'Error al ejecutar el modelo' });
            }

            try {
                // Parsear la respuesta JSON de Python
                const result = JSON.parse(prediction.trim());
                
                // Calcular costo total usando el precio_unitario del request
                const costo_total = result.cantidad_sugerida * precio_unitario;

                // Enviar respuesta extendida incluyendo todos los campos
                res.json({
                    prediction: result.prediction,
                    cantidad_sugerida: result.cantidad_sugerida,
                    costo_total: costo_total,
                    proveedor_id: proveedor_id, // Usar el proveedor_id del request
                    precio_unitario: precio_unitario, // Incluir el precio_unitario en la respuesta
                    message: result.prediction === 1 ? 'Se recomienda hacer pedido' : 'No se recomienda hacer pedido'
                });

            } catch (parseError) {
                console.error('Error parsing prediction:', parseError);
                res.status(500).json({ 
                    error: 'Error al procesar la predicción',
                    raw_prediction: prediction 
                });
            }
        });

    } catch (error) {
        console.error('Error en el endpoint:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 