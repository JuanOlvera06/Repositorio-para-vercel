import db from '../config/db.js';

export const getMisVis = async () => {
  const [rows] = await db.query(
    `SELECT id, mision, vision, info, img_mision, img_vision, iminfo
     FROM mision_vision
     LIMIT 1`
  );
  return rows[0] || { id: null, mision: '', vision: '', info: '', img_mision: '', img_vision: '', iminfo: '' };
};

export const updateMisVis = async (data) => {
  const { mision, vision, info } = data;

  //  si existe un registro
  const [rows] = await db.query(`SELECT id FROM mision_vision LIMIT 1`);
  if (rows.length === 0) {
    const [insert] = await db.query(
      `INSERT INTO mision_vision (mision, vision, info) VALUES (?, ?, ?)`,
      [mision, vision, info]
    );
    return insert.affectedRows > 0;
  }

  // Actualizamos registro exi
  const [result] = await db.query(
    `UPDATE mision_vision SET mision = ?, vision = ?, info = ? WHERE id = 1`,
    [mision, vision, info]
  );
  return result.affectedRows > 0;
};