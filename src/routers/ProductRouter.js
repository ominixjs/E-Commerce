import express from "express";

//=== Controllers
import * as productController from "../controllers/Products.js";
//=== Middlewares
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Rota principal dos produtos
router.get("/products/:page", AuthMiddleware, productController.Products);
// Criação de estoque
router.post("/products", AuthMiddleware, productController.Create);
// Editar informações do produto
router.put("/products/:id", AuthMiddleware, productController.Edit);

export default router;
