
import { Router } from 'express';
import * as ctrl from '../controllers/productos.controladores.js';

const router = Router();

router.get('/', ctrl.obtenerProductos)
router.post('/', ctrl.crearProducto);
router.put('/:id', ctrl.actualizarProducto);


export default router;
