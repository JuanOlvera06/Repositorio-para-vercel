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

export default router;