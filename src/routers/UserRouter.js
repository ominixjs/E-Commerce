import express from "express";

//=== Controllers
import * as userController from "../controllers/Users.js";
//=== Middlewares
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

//===
const router = express.Router();

// Visualizar cadastro no desenvolvimento
router.get("/users/list", userController.Users);

// Editar dados do cliente
router.put("/users/me", AuthMiddleware, userController.Edit);
// Deletar dados permanentemente do cliente
router.delete("/users/me", AuthMiddleware, userController.Delete);

export default router;
