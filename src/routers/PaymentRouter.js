import express from "express";

//=== Middlewares
import RequireAuth from "../middlewares/RequireAuth.js";
//=== Controller
import * as paymentController from "../controllers/Payment.js";

const router = express.Router();

// Fazer pagamento
router.post("/payments", RequireAuth, paymentController.Payment);
// Webhook para verificar status de pagamento
router.post("/webhook/asaas", paymentController.ReceiveAsaasWebhook);

export default router;
