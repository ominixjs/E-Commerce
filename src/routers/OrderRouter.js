import express from "express";

//=== Middlewares
import RequireAuth from "../middlewares/RequireAuth.js";
//=== Controller
import * as orderController from "../controllers/Order.js";

const router = express.Router();

// Pedidos feitos
router.post("/orders", RequireAuth, orderController.Create);
// Lista todos os pedidos
router.get("/orders/history", RequireAuth, orderController.History);
// Alterar forma de pagamentowqw
router.put("/orders/:orderId/payment-method", RequireAuth, orderController.ChangeMethod);
// Cancelar pedido
router.delete("/orders/:id", RequireAuth, orderController.Cancel);

export default router;
