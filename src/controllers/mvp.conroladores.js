import * as mvp from "../models/mvp.model.js";
// obtener

export const obtenerMisVis = async (req, res) => {
  try {
    const data = await mvp.getMisVis();
    res.json(data);
  } catch (error) {
    console.error("Error en obtenerMisVis:", error);
    res.status(500).json({ message: 'Error al obtener datos' });
  }
};

export const actualizarMisVis = async (req, res) => {
  try {
    const { mision, vision, info } = req.body;
    const success = await mvp.updateMisVis({ mision, vision, info });
    res.json({ success });
  } catch (error) {
    console.error("Error en actualizarMisVis:", error);
    res.status(500).json({ message: 'Error al actualizar datos' });
  }
};