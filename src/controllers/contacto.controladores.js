import * as contactoModel from "../models/contacto.model.js";

// GET: Obtener datos de contacto
export const getContactoController = async (req, res) => {
  try {
    const contacto = await contactoModel.getContacto();
    res.status(200).json({ contacto });
  } catch (error) {
    console.error("Error al obtener contacto:", error);
    res.status(500).json({ message: "Error al obtener los datos de contacto" });
  }
};

// PUT: Actualizar datos de contacto
export const updateContactoController = async (req, res) => {
  try {
    const actualizado = await contactoModel.updateContacto(req.body);
    if (actualizado) {
      res.status(200).json({ message: "Datos de contacto actualizados correctamente" });
    } else {
      res.status(404).json({ message: "No se pudo actualizar el contacto" });
    }
  } catch (error) {
    console.error("Error al actualizar contacto:", error);
    res.status(500).json({ message: "Error al actualizar los datos de contacto" });
  }
};