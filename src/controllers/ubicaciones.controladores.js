import * as model from "../models/ubicaciones.model.js";


// lista
export const getUbicacionesController = async (req, res) => {
  try {
    const data = await model.getUbicaciones();

    res.status(200).json({
      message: "Ubicaciones obtenidas correctamente",
      total: data.length,
      data
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error al obtener ubicaciones" });
  }
};


export const getUbicacionByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await model.getUbicacionById(id);

    if (!data) {
      return res.status(404).json({ message: "Ubicación no encontrada" });
    }

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: "Error al obtener ubicación" });
  }
};

// crear
export const crearubicacion = async (req, res) => {
  try {
    const id = await model.createUbicacion(req.body);

    res.status(201).json({
      message: "Ubicación creada correctamente",
      id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear ubicación" });
  }
};

// actualizar
export const actualizarubi = async (req, res) => {
  try {
    const { id } = req.params;

    const actualizado = await model.updateUbicacion(id, req.body);

    if (!actualizado) {
      return res.status(404).json({ message: "No se pudo actualizar" });
    }

    res.status(200).json({
      message: "Ubicación actualizada correctamente"
    });

  } catch (error) {
    res.status(500).json({ message: "Error al actualizar ubicación" });
  }
};

//eliminar
export const eliminarubi = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminado = await model.deleteUbicacion(id);

    if (!eliminado) {
      return res.status(404).json({ message: "No se pudo eliminar" });
    }

    res.status(200).json({
      message: "Ubicación eliminada correctamente"
    });

  } catch (error) {
    res.status(500).json({ message: "Error al eliminar ubicación" });
  }
};

