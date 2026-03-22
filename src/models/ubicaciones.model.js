import db from '../config/db.js'

// ================= LISTADO =================
export const getUbicaciones = async () => {
  const [rows] = await db.query("SELECT * FROM ubicaciones");
  return rows;
};

// ================= POR ID =================
export const getUbicacionById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM ubicaciones WHERE id = ?",
    [id]
  );
  return rows[0];
};

// ================= CREAR =================
export const createUbicacion = async (data) => {
  const { descripcion, imagen_nombre, url, latitud, longitud } = data;

  const [result] = await db.query(
    `INSERT INTO ubicaciones (descripcion, imagen_nombre, url, latitud, longitud)
     VALUES (?, ?, ?, ?, ?)`,
    [descripcion, imagen_nombre, url, latitud, longitud]
  );

  return result.insertId;
};

// ================= ACTUALIZAR =================
export const updateUbicacion = async (id, data) => {
  const { descripcion, imagen_nombre, url, latitud, longitud } = data;

  const [result] = await db.query(
    `UPDATE ubicaciones 
     SET descripcion=?, imagen_nombre=?, url=?, latitud=?, longitud=? 
     WHERE id=?`,
    [descripcion, imagen_nombre, url, latitud, longitud, id]
  );

  return result.affectedRows > 0;
};

// ================= ELIMINAR =================
export const deleteUbicacion = async (id) => {
  const [result] = await db.query(
    "DELETE FROM ubicaciones WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
};