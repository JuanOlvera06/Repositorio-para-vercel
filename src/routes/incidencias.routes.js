import { Router } from 'express';
import * as ctrl from '../controllers/incidencias.controladores.js';

const router = Router();

router.post('/faltas', ctrl.obtenerFaltas);
router.post('/faltas/empleado', ctrl.obtenerFaltasEmpleado)
router.post('/faltas/departamento', ctrl.obtenerFaltasDepartamento)

// ENDPOINT PUBLICO - SOLO ID Y NOMBRE DE DEPARTAMENTO
router.get('/departamentos', ctrl.obtenerDepartamentosPublicos);

// ENDPOINT PUBLICO - LISTA DE EMPLEADOS
router.get('/empleados', ctrl.obtenerEmpleadosPublicos);

// ENDPOINT PUBLICO - BUSQUEDA POR NOMBRE
router.get('/empleados/buscar', ctrl.buscarEmpleadoPorNombre);

// NUEVOS ENDPOINTS
//che

// POR MES
router.post('/faltas/mes/empleado', ctrl.faltasMesEmpleado)
router.post('/faltas/mes/departamento', ctrl.faltasMesDepartamento)

// POR SEMANA (ULTIMOS 2 MESES)
router.post('/faltas/semana/empleado', ctrl.faltasSemanaEmpleado)
router.post('/faltas/semana/departamento', ctrl.faltasSemanaDepartamento)

// NUEVOS ENDPOINTS MES ACTUAL AUTOMATICO
router.get('/faltas/mes/departamentos', ctrl.faltasMesDepartamentosGeneral)
router.get('/faltas/mes/departamento/empleados', ctrl.faltasMesDepartamentoPorNombre)

export default router;