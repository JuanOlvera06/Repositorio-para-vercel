
import { Router } from 'express';
import * as ctrl from '../controllers/grupo.controladores.js';

const router = Router();

router.get('/', ctrl.obtenerEmpleados)
router.put('/:id', ctrl.actualizarEmpleado);
router.delete('/:id', ctrl.borrarEmpleado);
router.post('/', ctrl.crearEmpleado);


export default router;
