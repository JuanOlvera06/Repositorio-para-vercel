import { Router } from 'express';
import * as preguntasCtrl from '../controllers/preguntas.controladores.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas Públicas
router.get('/', preguntasCtrl.obtenerPreguntas);
router.get('/:id', preguntasCtrl.obtenerPreguntaPorId);

// Rutas Privadas
router.post('/', verificarToken,preguntasCtrl.crearPregunta); 
router.put('/:id',verificarToken, preguntasCtrl.actualizarPregunta); 
router.delete('/:id',verificarToken, preguntasCtrl.borrarPregunta); 

export default router;