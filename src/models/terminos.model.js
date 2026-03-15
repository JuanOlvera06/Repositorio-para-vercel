import db from '../config/db.js';

export const obtenerTerminosYCondiciones = async () => {
    try {
        const [rows] = await db.query(`
            SELECT id, titulo, contenido, activo, fecha 
            FROM terminos_condiciones 
            ORDER BY fecha DESC, id DESC
        `);
        return rows;
    } catch (error) {
        throw error;  
    }
};

export const obtenerTerminosActivo = async () => {
    try {
        const [rows] = await db.query(`
            SELECT id, titulo, contenido, activo, fecha 
            FROM terminos_condiciones 
            WHERE activo = 1 
            ORDER BY fecha DESC 
            LIMIT 1
        `);
        return rows[0] || null; 
    } catch (error) {
        throw error;
    }
};


export const actualizarTerminos = async (titulo, contenido) => {
    try {
        const [result] = await db.query(`
            UPDATE terminos_condiciones 
            SET titulo = ?, contenido = ? 
            WHERE activo = 1
        `, [titulo, contenido]);
        
        return result;
    } catch (error) {
        throw error;
    }
};