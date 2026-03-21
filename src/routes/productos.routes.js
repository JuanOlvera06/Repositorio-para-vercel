import { Router } from 'express';
import * as ctrl from '../controllers/productos.controladores.js';

const router = Router();

router.get('/', ctrl.obtenerProductos);
router.post('/', ctrl.crearProducto);
router.put('/:id', ctrl.actualizarProducto);
router.delete('/:id', ctrl.borrarProducto);
router.get('/:id', ctrl.obtenerProductoPorId);

router.get('/categoria/:id', ctrl.obtenerProductosPorCategoria);

export default router;