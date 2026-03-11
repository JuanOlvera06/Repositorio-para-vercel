
import { Router } from 'express';
import * as ctrl from '../controllers/grupo.controladores.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verificarToken, ctrl.obtenerEmpleados)
router.put('/:id',  verificarToken, ctrl.actualizarEmpleado);
router.delete('/:id',verificarToken, ctrl.borrarEmpleado);
//router.post('/', ctrl.crearEmpleado);
router.post('/login', ctrl.login);
router.post('/register', ctrl.crearEmpleado);


router.get('/departamentos', verificarToken, ctrl.obtenerDepartamentos);

router.get('/puestos', verificarToken, ctrl.obtenerPuestos);

router.post('/empleado-info', verificarToken, ctrl.obtenerPuestoDepartamentoEmpleado);

export default router;
