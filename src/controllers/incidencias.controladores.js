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


export const obtenerFaltasEmpleado = async (req, res) => {

  try {

    const { mes, anio, idEmpleado } = req.body;

    const datos = await incidencias.obtenerFaltasEmpleado(mes, anio, idEmpleado);

    res.status(200).json(datos);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


export const obtenerFaltasDepartamento = async (req, res) => {

  try {

    const { mes, anio, idDepartamento } = req.body;

    const datos = await incidencias.obtenerFaltasDepartamento(mes, anio, idDepartamento);

    res.status(200).json(datos);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};