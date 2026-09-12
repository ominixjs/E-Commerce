import express from "express";

//=== Controllers
import * as userController from "../controllers/Users.js";

//===
const router = express.Router();

// Obter dados
router.post("/login", userController.Login);
// Cadastrar no DB
router.post("/register", userController.Create);
// Visualizar cadastro no desenvolvimento
router.get("/users/list", userController.Users);
// Editar dados do cliente
router.put("/users/:id", userController.Edit);
// Deletar dados permanentemente
router.delete("/users/:id", userController.Delete);

export default router;
