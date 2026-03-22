import { Router } from "express";
import * as ctrl from "../controllers/ubicaciones.controladores.js";
import { verificarToken } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/",verificarToken,ctrl.getUbicacionesController);
router.get("/:id", verificarToken,ctrl.getUbicacionByIdController);
router.post("/", verificarToken,ctrl.crearubicacion);
router.put("/:id",verificarToken,ctrl.actualizarubi);
router.delete("/:id", verificarToken, ctrl.eliminarubi);

export default router;

