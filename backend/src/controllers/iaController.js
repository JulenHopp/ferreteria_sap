const iaService = require("../services/iaService")

const iaController = {
    predecirOrdenes: async (req, res) => {
        try {
            const predicciones = await iaService.generarPredicciones();
            res.status(200).json(predicciones);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = iaController;
