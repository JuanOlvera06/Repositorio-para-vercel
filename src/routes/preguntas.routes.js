import { Router } from 'express';
import * as preguntasCtrl from '../controllers/preguntas.controladores.js';
// Importa tu middleware de seguridad
// import { verificarToken } from '../middlewares/auth.js'; 

const router = Router();

// Rutas Públicas (Cualquiera puede leerlas)
router.get('/', preguntasCtrl.obtenerPreguntas);
router.get('/:id', preguntasCtrl.obtenerPreguntaPorId);

// Rutas Privadas (Requieren token para modificar)
router.post('/', preguntasCtrl.crearPregunta); // Agrega verificarToken si lo necesitas
router.put('/:id', preguntasCtrl.actualizarPregunta); // Agrega verificarToken
router.delete('/:id', preguntasCtrl.borrarPregunta); // Agrega verificarToken

export default router;