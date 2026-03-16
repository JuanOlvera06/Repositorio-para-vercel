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


const calcularFechas = (mes, anio) => {

    const mesActualInicio = new Date(anio, mes - 1, 1)
    const mesActualFin = new Date(anio, mes, 0)

    const mes1Inicio = new Date(anio, mes - 2, 1)
    const mes1Fin = new Date(anio, mes - 1, 0)

    const mes2Inicio = new Date(anio, mes - 3, 1)
    const mes2Fin = new Date(anio, mes - 2, 0)

    return {
        mesActualInicio,
        mesActualFin,
        mes1Inicio,
        mes1Fin,
        mes2Inicio,
        mes2Fin
    }
}


export const obtenerFaltasEmpleado = async (mes, anio, idEmpleado) => {

    const f = calcularFechas(mes, anio)

    const [mesActual] = await db.query(`
        SELECT COUNT(*) AS faltas
        FROM incidencias
        WHERE Id_Tipo_Incidencia = 1
        AND Id_Empleado = ?
        AND Fecha BETWEEN ? AND ?
    `,[idEmpleado, f.mesActualInicio, f.mesActualFin])

    const [mes1] = await db.query(`
        SELECT COUNT(*) AS faltas
        FROM incidencias
        WHERE Id_Tipo_Incidencia = 1
        AND Id_Empleado = ?
        AND Fecha BETWEEN ? AND ?
    `,[idEmpleado, f.mes1Inicio, f.mes1Fin])

    const [mes2] = await db.query(`
        SELECT COUNT(*) AS faltas
        FROM incidencias
        WHERE Id_Tipo_Incidencia = 1
        AND Id_Empleado = ?
        AND Fecha BETWEEN ? AND ?
    `,[idEmpleado, f.mes2Inicio, f.mes2Fin])


    return {

        mesActual: mesActual[0].faltas,
        mesAnterior: mes1[0].faltas,
        mesAnterior2: mes2[0].faltas

    }

}

export const obtenerFaltasDepartamento = async (mes, anio, idDepartamento) => {

    const f = calcularFechas(mes, anio)

    const [mesActual] = await db.query(`
        SELECT COUNT(*) AS faltas
        FROM incidencias i
        INNER JOIN empleados e 
        ON i.Id_Empleado = e.Id_Empleado
        WHERE i.Id_Tipo_Incidencia = 1
        AND e.Id_Departamento = ?
        AND i.Fecha BETWEEN ? AND ?
    `,[idDepartamento, f.mesActualInicio, f.mesActualFin])

    const [mes1] = await db.query(`
        SELECT COUNT(*) AS faltas
        FROM incidencias i
        INNER JOIN empleados e 
        ON i.Id_Empleado = e.Id_Empleado
        WHERE i.Id_Tipo_Incidencia = 1
        AND e.Id_Departamento = ?
        AND i.Fecha BETWEEN ? AND ?
    `,[idDepartamento, f.mes1Inicio, f.mes1Fin])

    const [mes2] = await db.query(`
        SELECT COUNT(*) AS faltas
        FROM incidencias i
        INNER JOIN empleados e 
        ON i.Id_Empleado = e.Id_Empleado
        WHERE i.Id_Tipo_Incidencia = 1
        AND e.Id_Departamento = ?
        AND i.Fecha BETWEEN ? AND ?
    `,[idDepartamento, f.mes2Inicio, f.mes2Fin])


    return {

        mesActual: mesActual[0].faltas,
        mesAnterior: mes1[0].faltas,
        mesAnterior2: mes2[0].faltas

    }

}