
import { Router } from 'express';
import * as ctrl from '../controllers/mvp.conroladores.js';

const router = Router();

// GET
router.get('/', ctrl.obtenerMisVis);

// actualizar
router.put('/', ctrl.actualizarMisVis);

export default router;