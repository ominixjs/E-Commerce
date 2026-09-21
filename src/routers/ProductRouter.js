import express from "express";

//=== Controllers
import * as productController from "../controllers/Products.js";
//=== Middlewares
import RequireAuth from "../middlewares/RequireAuth.js";

const router = express.Router();

// Lista de produtos
router.get("/products", RequireAuth, productController.Products);
// Lista de produtos favoritados
router.get("/products/favorite", RequireAuth, productController.Favorites);
// Consulta de produto
router.get("/products/:id", RequireAuth, productController.ProductInfo);

// Criação de estoque
router.post("/products", RequireAuth, productController.Create);
// Editar informações do produto
router.put("/products/:id", RequireAuth, productController.Edit);
// Deletar estoque de produto
router.delete("/products/:id", RequireAuth, productController.Delete);

// Adicionar produto ao favoritos
router.post("/products/:id/favorite", RequireAuth, productController.AddFavorite);
// Remover produtos dos favoritos
router.delete("/products/:id/favorite", RequireAuth, productController.RemoveFavorite);

export default router;
