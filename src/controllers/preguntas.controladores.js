import * as preguntasModelo from '../models/preguntas.model.js';
// Asegúrate de importar tus validaciones si las tienes
// import * as validar from '../utils/validaciones.js';

export const obtenerPreguntas = async (req, res) => {
    try {
        const resultado = await preguntasModelo.obtenerPreguntas();
        res.status(200).json({
            message: "Preguntas obtenidas correctamente",
            total: resultado.length,
            data: resultado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerPreguntaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pregunta = await preguntasModelo.obtenerPreguntaPorId(id);

        if (!pregunta) {
            return res.status(404).json({ message: "Pregunta no encontrada" });
        }
        res.status(200).json(pregunta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const crearPregunta = async (req, res) => {
    try {
        const { pregunta, respuesta } = req.body;

        if (!pregunta || !respuesta) {
            return res.status(400).json({ message: "La pregunta y la respuesta son obligatorias" });
        }

        const nuevaPregunta = await preguntasModelo.crearPregunta({ pregunta, respuesta });
        res.status(201).json({ message: "Pregunta creada", data: nuevaPregunta });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarPregunta = async (req, res) => {
    try {
        const { id } = req.params;
        const { pregunta, respuesta } = req.body;

        if (!pregunta || !respuesta) {
            return res.status(400).json({ message: "La pregunta y la respuesta son obligatorias" });
        }

        const actualizada = await preguntasModelo.actualizarPregunta({ id, pregunta, respuesta });

        if (actualizada.affectedRows === 0) {
            return res.status(404).json({ message: "Pregunta no encontrada" });
        }

        res.status(200).json({ message: "Pregunta actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const borrarPregunta = async (req, res) => {
    try {
        const { id } = req.params;
        const borrada = await preguntasModelo.borrarPregunta(id);

        if (borrada.affectedRows === 0) {
            return res.status(404).json({ message: "Pregunta no encontrada" });
        }

        res.status(200).json({ message: "Pregunta eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};