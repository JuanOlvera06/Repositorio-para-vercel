import { Router } from 'express';
import * as terminosCtrl from '../controllers/terminos.controladores.js';

const router = Router();

router.get('/', terminosCtrl.obtenerTerminosYCondiciones);
router.put('/', terminosCtrl.actualizarTerminos);

// Opcional si se prefiee una ruta específica para el activo
// router.get('/activo', terminosCtrl.obtenerTerminosActivo); 
// (pero tendrías que crear la función en el controlador)

export default router;