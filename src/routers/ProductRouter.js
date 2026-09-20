import express from "express";

//=== Controllers
import * as productController from "../controllers/Products.js";
//=== Middlewares
import RequireAuth from "../middlewares/RequireAuth.js";

const router = express.Router();

// Rota principal dos produtos
router.get("/products/:page", RequireAuth, productController.Products);
// Criação de estoque
router.post("/products", RequireAuth, productController.Create);
// Editar informações do produto
router.put("/products/:id", RequireAuth, productController.Edit);
// Deletar estoque de produto
router.delete("/products/:id", RequireAuth, productController.Delete);
// Lista de produtos favoritados
router.get("/products/favorites/:page", RequireAuth, productController.Favorites);
// Adicionar produto ao favoritos
router.get("/products/:id/favorite", RequireAuth, productController.AddFavorite);
// Remover produtos dos favoritos
router.delete("/products/:id/favorite", RequireAuth, productController.RemoveFavorite);

export default router;
