import { Router } from 'express';
import * as perfilCtrl from '../controllers/perfil.controladores.js';
// import { verificarToken } from '../middlewares/auth.js'; // Ajusta la ruta a tu middleware

const router = Router();

// GET /api/perfil/:id -> Para cargar los datos en el formulario
router.get('/:id', perfilCtrl.obtenerPerfil);

// PUT /api/perfil/:id -> Para guardar los cambios
router.put('/:id', perfilCtrl.actualizarPerfil);

export default router;