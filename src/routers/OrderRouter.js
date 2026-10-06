import express from "express";

//=== Middlewares
import RequireAuth from "../middlewares/RequireAuth.js";
//=== Controller
import * as orderController from "../controllers/Order.js";

const router = express.Router();

// Pedidos feitos
router.post("/orders", RequireAuth, orderController.Orders);
// Cancelar pedido
router.delete("/orders/:id", RequireAuth, orderController.Cancel);

export default router;
