import { Router } from 'express';
import * as ctrl from '../controllers/incidencias.controladores.js';

const router = Router();

router.post('/faltas', ctrl.obtenerFaltas);

export default router;