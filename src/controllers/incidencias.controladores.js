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




export const obtenerEmpleadosPublicos = async (req, res) => {

  try {

    let { limit, start } = req.query;

    if (limit === undefined || limit === "") limit = "10";
    if (start === undefined || start === "") start = "0";

    const limitNumber = parseInt(limit);
    const startNumber = parseInt(start);

    if (isNaN(limitNumber) || isNaN(startNumber) ||
        limitNumber < 0 || startNumber < 0) {

      return res.status(400).json({
        message: "limit y start deben ser números válidos mayores o iguales a 0"
      });

    }

    const resultado = await incidencias.obtenerEmpleadosPublicos(limitNumber, startNumber);

    res.status(200).json({
      message: "Empleados obtenidos correctamente",
      limit: limitNumber,
      start: startNumber,
      total: resultado.length,
      data: resultado
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};



export const obtenerDepartamentosPublicos = async (req, res) => {

  try {

    const resultado = await incidencias.obtenerDepartamentosPublicos();

    res.status(200).json({
      message: "Departamentos obtenidos correctamente",
      total: resultado.length,
      data: resultado
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};



export const buscarEmpleadoPorNombre = async (req, res) => {

  try {

    let { texto, limit, start } = req.query;

    if (!texto) {
      return res.status(400).json({
        message: "Debe enviar un texto para buscar"
      });
    }

    if (limit === undefined || limit === "") limit = "10";
    if (start === undefined || start === "") start = "0";

    const limitNumber = parseInt(limit);
    const startNumber = parseInt(start);

    const resultado = await incidencias.buscarEmpleadoPorNombre(
      texto,
      limitNumber,
      startNumber
    );

    res.status(200).json({
      message: "Busqueda realizada correctamente",
      total: resultado.length,
      data: resultado
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};



export const faltasMesEmpleado = async (req, res) => {
  try {
    const { anio, idEmpleado } = req.body
    const data = await incidencias.obtenerFaltasPorMesEmpleado(anio, idEmpleado)
    res.json(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

export const faltasMesDepartamento = async (req, res) => {
  try {
    const { anio, idDepartamento } = req.body
    const data = await incidencias.obtenerFaltasPorMesDepartamento(anio, idDepartamento)
    res.json(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

export const faltasSemanaEmpleado = async (req, res) => {
  try {
    const { mes, anio, idEmpleado } = req.body
    const data = await incidencias.obtenerFaltasSemanalesEmpleado(mes, anio, idEmpleado)
    res.json(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

export const faltasSemanaDepartamento = async (req, res) => {
  try {
    const { mes, anio, idDepartamento } = req.body
    const data = await incidencias.obtenerFaltasSemanalesDepartamento(mes, anio, idDepartamento)
    res.json(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

// FALTAS POR TODOS LOS DEPARTAMENTOS (GENERAL)
export const faltasMesDepartamentosGeneral = async (req, res) => {
  try {

    const datos = await incidencias.faltasMesDepartamentosGeneral();

    res.status(200).json(datos);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// FALTAS POR EMPLEADOS DE UN DEPARTAMENTO (RECIBE NOMBRE)
export const faltasMesDepartamentoPorNombre = async (req, res) => {
  try {

    const { departamento } = req.query; // ejemplo: ?departamento=Administracion

    const datos = await incidencias.faltasMesDepartamentoPorNombre(departamento);

    res.status(200).json(datos);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};