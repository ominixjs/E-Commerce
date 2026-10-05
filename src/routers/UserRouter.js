import express from "express";

//=== Controllers
import * as userController from "../controllers/Users.js";
//=== Middlewares
import RequireAuth from "../middlewares/RequireAuth.js";

//===
const router = express.Router();

// Visualizar cadastros no desenvolvimento
router.get("/users/me", RequireAuth, userController.User);
// Editar dados do cliente
router.put("/users/me", RequireAuth, userController.Edit);
// Deletar dados permanentemente do cliente
router.delete("/users/me", RequireAuth, userController.Delete);

// Adicionar um endereço
router.post("/users/me/address", RequireAuth, userController.CreateAddress);
// Editar endereço
router.put("/users/me/address/:id", RequireAuth, userController.EditAddress);
// Deletar endereço
router.delete("/users/me/address/:id", RequireAuth, userController.DeleteAddress);

export default router;
