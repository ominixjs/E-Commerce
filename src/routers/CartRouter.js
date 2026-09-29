import express from "express";

//=== Controllers
import * as cartController from "../controllers/Cart.js";
//=== Middlewares
import RequireAuth from "../middlewares/RequireAuth.js";

//===
const router = express.Router();

// Carrinho com os produtos
router.get("/cart", RequireAuth, cartController.Cart);
// Adicionar produto no carrinho
router.post("/cart/items", RequireAuth, cartController.Add);
// Editar produtos do carrinho
router.put("/cart/items/:id", RequireAuth, cartController.Edit);
// Remover um produto do carrinho
router.delete("/cart/items/:id", RequireAuth, cartController.Remove);
// Remover todos os produtos do carrinho
router.delete("/cart/items", RequireAuth, cartController.RemoveAll);

export default router;
