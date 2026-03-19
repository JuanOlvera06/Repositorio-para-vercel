
import { Router } from 'express';
import * as ctrl from '../controllers/grupo.controladores.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verificarToken, ctrl.obtenerEmpleados)
router.put('/:id',  verificarToken, ctrl.actualizarEmpleado);
router.delete('/:id',verificarToken, ctrl.borrarEmpleado);
//router.post('/', ctrl.crearEmpleado);
router.post('/login', ctrl.login);
router.post('/register', verificarToken, ctrl.crearEmpleado);



router.get('/departamentos', verificarToken, ctrl.obtenerDepartamentos);

router.get('/puestos', verificarToken, ctrl.obtenerPuestos);

router.get('/tipos-usuario', verificarToken, ctrl.obtenerTiposUsuario);

router.get('/empleado-value/:id', verificarToken, ctrl.obtenerEmpleadoValue);

router.get('/empleados/:id', verificarToken, ctrl.obtenerEmpleadoPorId);

router.get('/reporte-empleado', verificarToken, ctrl.reporteEmpleado);

router.get('/reporte-departamento', verificarToken, ctrl.reporteDepartamento);



export default router;
