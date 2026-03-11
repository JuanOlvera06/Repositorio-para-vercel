import * as incidencias from "../models/incidencias.model.js";

export const obtenerFaltas = async (req, res) => {
  try {

    const { fechaHoy } = req.body;

    const datos = await incidencias.obtenerFaltas(fechaHoy);

    res.status(200).json(datos);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};