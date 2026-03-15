import db from '../config/db.js';

// 1. OBTENER TODAS
export const obtenerPreguntas = async () => {
    // Ajustado a: id, pregunta, respuesta
    const [rows] = await db.query(`SELECT id, pregunta, respuesta FROM preguntas_frecuentes`);
    return rows;
};

// 2. OBTENER UNA POR ID
export const obtenerPreguntaPorId = async (id) => {
    // Ajustado a: id
    const [rows] = await db.query(`SELECT id, pregunta, respuesta FROM preguntas_frecuentes WHERE id = ?`, [id]);
    return rows[0];
};

// 3. CREAR NUEVA
export const crearPregunta = async ({ pregunta, respuesta }) => {
    const [result] = await db.query(
        `INSERT INTO preguntas_frecuentes (pregunta, respuesta) VALUES (?, ?)`,
        [pregunta, respuesta]
    );
    return { id: result.insertId, pregunta, respuesta };
};

// 4. ACTUALIZAR EXISTENTE
export const actualizarPregunta = async ({ id, pregunta, respuesta }) => {
    const [result] = await db.query(
        `UPDATE preguntas_frecuentes SET pregunta = ?, respuesta = ? WHERE id = ?`,
        [pregunta, respuesta, id]
    );
    return { affectedRows: result.affectedRows };
};

// 5. BORRAR
export const borrarPregunta = async (id) => {
    const [result] = await db.query(`DELETE FROM preguntas_frecuentes WHERE id = ?`, [id]);
    return { affectedRows: result.affectedRows };
};