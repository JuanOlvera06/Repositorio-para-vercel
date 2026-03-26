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


export const obtenerEmpleadosPublicos = async (limit, start) => {

  const [rows] = await db.query(`
      SELECT 
          e.Id_Empleado,
          CONCAT(e.Nombre,' ',e.Apellido_Paterno,' ',e.Apellido_Materno) AS Nombre_Completo,
          d.Id_Departamento,
          d.Departamento,
          p.Puesto,

          -- FALTAS DEL MES ACTUAL
          (
            SELECT COUNT(*)
            FROM incidencias i
            WHERE i.Id_Tipo_Incidencia = 1
            AND i.Id_Empleado = e.Id_Empleado
            AND MONTH(i.Fecha) = MONTH(CURDATE())
            AND YEAR(i.Fecha) = YEAR(CURDATE())
          ) AS faltas_mes_actual,

          -- FALTAS ACUMULADAS DEL AÑO
          (
            SELECT COUNT(*)
            FROM incidencias i
            WHERE i.Id_Tipo_Incidencia = 1
            AND i.Id_Empleado = e.Id_Empleado
            AND YEAR(i.Fecha) = YEAR(CURDATE())
          ) AS faltas_anio_actual

      FROM empleados e
      INNER JOIN departamentos d 
          ON e.Id_Departamento = d.Id_Departamento
      INNER JOIN puestos p 
          ON e.Id_Puesto = p.Id_Puesto
      ORDER BY e.Id_Empleado ASC
      LIMIT ? OFFSET ?
  `, [Number(limit), Number(start)]);

  return rows;

};


export const obtenerDepartamentosPublicos = async () => {

  const [rows] = await db.query(`
        SELECT 
            d.Id_Departamento,
            d.Departamento,

            -- FALTAS DEL MES ACTUAL
            (
              SELECT COUNT(*)
              FROM incidencias i
              INNER JOIN empleados e 
                ON i.Id_Empleado = e.Id_Empleado
              WHERE i.Id_Tipo_Incidencia = 1
              AND e.Id_Departamento = d.Id_Departamento
              AND MONTH(i.Fecha) = MONTH(CURDATE())
              AND YEAR(i.Fecha) = YEAR(CURDATE())
            ) AS faltas_mes_actual,

            -- FALTAS ACUMULADAS DEL AÑO
            (
              SELECT COUNT(*)
              FROM incidencias i
              INNER JOIN empleados e 
                ON i.Id_Empleado = e.Id_Empleado
              WHERE i.Id_Tipo_Incidencia = 1
              AND e.Id_Departamento = d.Id_Departamento
              AND YEAR(i.Fecha) = YEAR(CURDATE())
            ) AS faltas_anio_actual

        FROM departamentos d
  `);

  return rows;

};


export const buscarEmpleadoPorNombre = async (texto, limit, start) => {

  const [rows] = await db.query(`
      SELECT 
          e.Id_Empleado,
          e.Nombre AS Nombre_Completo,
          d.Id_Departamento,
              e.Correo,
    e.Telefono,
          d.Departamento,
          p.Puesto
      FROM empleados e
      INNER JOIN departamentos d 
          ON e.Id_Departamento = d.Id_Departamento
      INNER JOIN puestos p 
          ON e.Id_Puesto = p.Id_Puesto
      WHERE CONCAT(e.Nombre,' ',e.Apellido_Paterno,' ',e.Apellido_Materno) LIKE ?
      ORDER BY e.Id_Empleado ASC
      LIMIT ? OFFSET ?
  `, [`%${texto}%`, Number(limit), Number(start)]);

  return rows;

};



export const obtenerFaltasPorMesEmpleado = async (anio, idEmpleado) => {

    const [rows] = await db.query(`
        SELECT 
            MONTH(Fecha) - 1 AS mes,
            COUNT(*) AS faltas
        FROM incidencias
        WHERE Id_Tipo_Incidencia = 1
        AND Id_Empleado = ?
        AND YEAR(Fecha) = ?
        GROUP BY MONTH(Fecha)
        ORDER BY mes
    `, [idEmpleado, anio])

    const mesActual = new Date().getMonth()
    let resultado = new Array(mesActual + 1).fill(0)

    rows.forEach(r => {
        resultado[r.mes] = r.faltas
    })

    return resultado
}



export const obtenerFaltasPorMesDepartamento = async (anio, idDepartamento) => {

    const [rows] = await db.query(`
        SELECT 
            MONTH(i.Fecha) - 1 AS mes,
            COUNT(*) AS faltas
        FROM incidencias i
        INNER JOIN empleados e 
        ON i.Id_Empleado = e.Id_Empleado
        WHERE i.Id_Tipo_Incidencia = 1
        AND e.Id_Departamento = ?
        AND YEAR(i.Fecha) = ?
        GROUP BY MONTH(i.Fecha)
        ORDER BY mes
    `, [idDepartamento, anio])

    const mesActual = new Date().getMonth()
    let resultado = new Array(mesActual + 1).fill(0)

    rows.forEach(r => {
        resultado[r.mes] = r.faltas
    })

    return resultado
}


/*
export const obtenerFaltasSemanalesEmpleado = async (mes, anio, idEmpleado) => {

    const f = calcularFechas(mes, anio)

    const [rows] = await db.query(`
        SELECT 
            FLOOR(DATEDIFF(Fecha, ?) / 7) AS semana,
            COUNT(*) AS faltas
        FROM incidencias
        WHERE Id_Tipo_Incidencia = 1
        AND Id_Empleado = ?
        AND Fecha BETWEEN ? AND ?
        GROUP BY semana
        ORDER BY semana
    `, [f.mes2Inicio, idEmpleado, f.mes2Inicio, f.mesActualFin]) //  cambio aquí

    //  calcular cuántas semanas hay realmente
    const maxSemana = rows.length > 0 
        ? Math.max(...rows.map(r => r.semana)) 
        : 0

    //  arreglo dinámico (ya no fijo en 10)
    let resultado = new Array(maxSemana + 1).fill(0)

    rows.forEach(r => {
        resultado[r.semana] = r.faltas
    })

    return resultado
}
*/
export const obtenerFaltasSemanalesEmpleado = async (mes, anio, idEmpleado) => {

    const [rows] = await db.query(`
        SELECT 
            FLOOR((DAY(Fecha) - 1) / 7) AS semana,
            COUNT(*) AS faltas
        FROM incidencias
        WHERE Id_Tipo_Incidencia = 1
        AND Id_Empleado = ?
        AND MONTH(Fecha) = ?
        AND YEAR(Fecha) = ?
        GROUP BY semana
        ORDER BY semana
    `, [idEmpleado, mes, anio])

    //  SIEMPRE 5 SEMANAS (no rompe frontend)
    let resultado = new Array(5).fill(0)

    rows.forEach(r => {
        resultado[r.semana] = r.faltas
    })

    return resultado
}

export const obtenerFaltasSemanalesDepartamento = async (mes, anio, idDepartamento) => {

    const f = calcularFechas(mes, anio)

    const [rows] = await db.query(`
        SELECT 
            FLOOR(DATEDIFF(i.Fecha, ?) / 7) AS semana,
            COUNT(*) AS faltas
        FROM incidencias i
        INNER JOIN empleados e 
        ON i.Id_Empleado = e.Id_Empleado
        WHERE i.Id_Tipo_Incidencia = 1
        AND e.Id_Departamento = ?
        AND i.Fecha BETWEEN ? AND ?
        GROUP BY semana
        ORDER BY semana
    `, [f.mes2Inicio, idDepartamento, f.mes2Inicio, f.mesActualFin]) 

    //  calcular semanas reales
    const maxSemana = rows.length > 0 
        ? Math.max(...rows.map(r => r.semana)) 
        : 0

    //  arreglo dinámico
    let resultado = new Array(maxSemana + 1).fill(0)

    rows.forEach(r => {
        resultado[r.semana] = r.faltas
    })

    return resultado
}


const obtenerInicioMesActual = () => {

    const hoy = new Date();

    // último día del mes anterior
    const ultimoDiaMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0);

    return ultimoDiaMesAnterior;
}



export const faltasMesDepartamentosGeneral = async () => {

    const fecha = obtenerInicioMesActual();

    const [rows] = await db.query(`
        SELECT 
            departamentos.Id_Departamento,
            departamentos.Departamento,
            COUNT(incidencias.Id_Incidencia) AS TotalFaltas
        FROM empleados
        INNER JOIN departamentos 
            ON empleados.Id_Departamento = departamentos.Id_Departamento
        LEFT JOIN incidencias 
            ON empleados.Id_Empleado = incidencias.Id_Empleado
            AND incidencias.Id_Tipo_Incidencia = 1
            AND incidencias.Fecha > ?
        GROUP BY 
            departamentos.Id_Departamento,
            departamentos.Departamento
        ORDER BY TotalFaltas DESC;
    `, [fecha]);

    return rows;
};

export const faltasMesDepartamentoPorNombre = async (departamento) => {

    const fecha = obtenerInicioMesActual();

    const [rows] = await db.query(`
        SELECT 
            empleados.Id_Empleado,
            empleados.Nombre,
            COUNT(incidencias.Id_Incidencia) AS TotalFaltas
        FROM empleados
        INNER JOIN departamentos 
            ON empleados.Id_Departamento = departamentos.Id_Departamento
        LEFT JOIN incidencias 
            ON empleados.Id_Empleado = incidencias.Id_Empleado
            AND incidencias.Id_Tipo_Incidencia = 1
            AND incidencias.Fecha > ?
        WHERE departamentos.Departamento = ?
        GROUP BY empleados.Id_Empleado, empleados.Nombre
        ORDER BY TotalFaltas DESC;
    `, [fecha, departamento]);

    return rows;
};