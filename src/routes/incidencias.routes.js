import { Router } from 'express';
import * as ctrl from '../controllers/incidencias.controladores.js';

const router = Router();

router.post('/faltas', ctrl.obtenerFaltas);
router.post('/faltas/empleado', ctrl.obtenerFaltasEmpleado)
router.post('/faltas/departamento', ctrl.obtenerFaltasDepartamento)

export default router;