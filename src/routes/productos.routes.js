import { Router } from 'express';
import * as ctrl from '../controllers/productos.controladores.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', ctrl.obtenerProductos);
router.get('/:id', ctrl.obtenerProductoPorId);
router.get('/categoria/:id', ctrl.obtenerProductosPorCategoria);


router.post('/',verificarToken, ctrl.crearProducto);
router.put('/:id',verificarToken, ctrl.actualizarProducto);
router.delete('/:id',verificarToken, ctrl.borrarProducto);


export default router;