import db from '../config/db.js'

export const obtenerProductos = async (limit = 10, start = 0) => {
  const [rows] = await db.query(
    `SELECT p.id_producto, 
            p.nombre_producto, 
            p.ImagenesProducto, 
            c.nombre_categoria
     FROM productos p
     LEFT JOIN categoria c 
       ON p.id_categoria = c.id_categoria
     LIMIT ? OFFSET ?`,
    [Number(limit), Number(start)]
  );

  return rows;
};