import { Router } from "express";
import * as ctrl from "../controllers/ubicaciones.controladores.js";
import { verificarToken } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/",verificarToken,ctrl.getUbicacionesController);
router.get("/:id", ctrl.getUbicacionByIdController);
router.post("/", ctrl.crearubicacion);
router.put("/:id",verificarToken,ctrl.actualizarubi);
router.delete("/:id", verificarToken, ctrl.eliminarubi);

export default router;

