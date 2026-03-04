import * as productoModelo from "../models/productos.model.js";

export const obtenerProductos = async (req, res) => {
  try {
    let { limit, start } = req.query;


  if (limit === undefined || limit === "") limit = "10";
if (start === undefined || start === "") start = "0";

    const limitNumber = parseInt(limit); //convertir a numero entero
    const startNumber = parseInt(start);

    if (isNaN(limitNumber) || isNaN(startNumber) || //validacion si es numero
        limitNumber < 0 || startNumber < 0) { //si es nmayor a 0
      return res.status(400).json({
        message: "limit y start deben ser números válidos mayores o iguales a 0",
      });
    }

    const resultado = await productoModelo.obtenerProductos({
      limit: limitNumber,
      start: startNumber,
    });

    res.status(200).json({
      message: "Productos obtenidos correctamente",
      limit: limitNumber,
      start: startNumber,
      total: resultado.length,
      data: resultado,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};