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


export const actualizarTerminos = async (req, res) => {
    try {
        // Extraemos los datos que envía el fetch
        const { titulo, contenido } = req.body;

        // Validamos que vengan los datos
        if (!titulo || !contenido) {
            return res.status(400).json({ message: "El título y el contenido son obligatorios" });
        }

        const resultado = await terminosModel.actualizarTerminos(titulo, contenido);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: "No se encontró ningún término activo para actualizar" });
        }

        res.status(200).json({ message: "Términos actualizados con éxito" });
    } catch (error) {
        console.error("Error al actualizar términos y condiciones:", error);
        res.status(500).json({ 
            error: "Error interno del servidor",
            message: error.message 
        });
    }
};