
import { Router } from 'express';
import * as ctrl from '../controllers/MsVsPE.controladores.js';

const router = Router();

router.get('/', ctrl.obtenerMision_Vision)


export default router;