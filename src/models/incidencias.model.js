import db from '../config/db.js'

export const obtenerFaltas = async (fechaHoy) => {

    // consulta 1
    const [enero] = await db.query(`
        SELECT COUNT(*) AS faltasEnero 
        FROM incidencias 
        WHERE Id_Tipo_Incidencia = 1 
        AND Fecha >= '2026-01-01' 
        AND Fecha <= '2026-01-31';
    `);

    // consulta 2
    const [actual] = await db.query(`
        SELECT COUNT(*) AS faltasActual
        FROM incidencias 
        WHERE Id_Tipo_Incidencia = 1 
        AND Fecha >= '2026-01-01' 
        AND Fecha <= ?;
    `,[fechaHoy]);

    return {
        faltasEnero: enero[0].faltasEnero,
        faltasActual: actual[0].faltasActual
    }
}