import express from "express";

//=== Controllers
import * as mainController from "../controllers/Main.js";

//===
const router = express.Router();

// Obter dados
router.post("/", mainController.Home);

export default router;
