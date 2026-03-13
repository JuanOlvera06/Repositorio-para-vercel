import * as terminosModel from "../models/terminos.model.js";

export const obtenerTerminosYCondiciones = async (req, res) => {
    try {
        const terminos = await terminosModel.obtenerTerminosActivo();
        if (!terminos) {
            return res.status(404).json({ message: "No hay términos y condiciones activos" });
        }

        res.status(200).json(terminos);
    } catch (error) {
        console.error("Error al obtener términos y condiciones:", error);
        res.status(500).json({ 
            error: "Error interno del servidor",
            message: error.message 
        });
    }
};