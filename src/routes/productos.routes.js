
import { Router } from 'express';
import * as ctrl from '../controllers/productos.controladores.js';

const router = Router();

router.get('/', ctrl.obtenerProductos)



export default router;
