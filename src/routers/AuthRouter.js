import express from "express";

//=== Controllers
import * as authController from "../controllers/Auth.js";
//=== Middlewares
import AuthLimiter from "../middlewares/AuthLimiter.js";
import RequestGuest from "../middlewares/RequestGuest.js";

//===
const router = express.Router();

// Logar na conta do usuário
router.post("/login", AuthLimiter, RequestGuest, authController.Login);
// Cadastrar no DB
router.post("/register", AuthLimiter, RequestGuest, authController.Create);

export default router;
