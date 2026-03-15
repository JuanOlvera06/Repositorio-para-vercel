import db from '../config/db.js';

export const obtenerPerfil = async (id) => {
  const [rows] = await db.query(
    `SELECT Id_Empleado, Nombre, Apellido_Paterno, Apellido_Materno, Correo, Telefono 
     FROM empleados 
     WHERE Id_Empleado = ?`, 
    [id]
  );
  return rows[0];
};

export const actualizarPerfil = async ({ id, correo, telefono, contrasena }) => {
  if (contrasena) {
    const [result] = await db.query(
      `UPDATE empleados SET Correo=?, Telefono=?, Contrasena=? WHERE Id_Empleado=?`,
      [correo, telefono, contrasena, id]
    );
    return { affectedRows: result.affectedRows };
  } else {
    const [result] = await db.query(
      `UPDATE empleados SET Correo=?, Telefono=? WHERE Id_Empleado=?`,
      [correo, telefono, id]
    );
    return { affectedRows: result.affectedRows };
  }
};