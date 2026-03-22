import { Router } from "express";
import * as ctrl from "../controllers/ubicaciones.controladores.js";
//import { verificarToken } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/",ctrl.getUbicacionesController);
router.get("/:id", ctrl.getUbicacionByIdController);
router.post("/", ctrl.crearubicacion);
router.put("/:id",ctrl.actualizarubi);
router.delete("/:id", ctrl.eliminarubi);

export default router;

