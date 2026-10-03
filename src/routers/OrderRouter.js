import express from "express";

//=== Middlewares
import RequireAuth from "../middlewares/RequireAuth.js";
//=== Controller
import * as orderController from "../controllers/Order.js";

const router = express.Router();

// Pedidos feitos
router.get("/orders", RequireAuth, orderController.Orders);

export default router;
