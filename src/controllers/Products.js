//=== Services
import Pagination from "../services/product/Pagination.js";
import CreateProductInventory from "../services/product/CreateProductInventory.js";
import EditProductStock from "../services/product/EditProductStock.js";
import DeleteProductStock from "../services/product/DeleteProductStock.js";
import AddProductToFavorites from "../services/product/AddProductToFavorites.js";
import RemoveProductfromFavorites from "../services/product/RemoveProductFromFavorites.js";

export async function Products(req, res) {
    // Lista com os produtos prontos para paginação e filtragem
    const productList = await Pagination(req.user, req.params.page, "product");

    return res.status(200).json(productList);
}

export async function Create(req, res) {
    // Valida e cria estoque de produtos
    await CreateProductInventory(req.user, req.body);

    return res.status(200).json({ message: "Estoque criado com sucesso" });
}

export async function Edit(req, res) {
    // Valida e edita dados do produto
    await EditProductStock(req.user, req.params.id, req.body);

    return res.status(200).json({ message: "Produto editado com sucesso" });
}

export async function Delete(req, res) {
    // Valida e deleta um estoque
    await DeleteProductStock(req.user, req.params.id);

    return res.status(200).json({ message: "Produto deletado com sucesso" });
}

export async function Favorites(req, res) {
    // Lista para paginação dos produtos favoritados
    const favoriteList = await Pagination(req.user, req.params.page, "favorite");

    return res.status(200).json({ favoriteList });
}

export async function AddFavorite(req, res) {
    // Valida dados e favorita produto
    await AddProductToFavorites(req.user, req.params.id);

    return res.status(200).json({ message: `Produto : ${req.params.id} favoritado` });
}

export async function RemoveFavorite(req, res) {
    // Valida e remove produtos dos favoritos
    await RemoveProductfromFavorites(req.user, req.params.id);

    return res
        .status(200)
        .json({ message: `Produto : ${req.params.id} foi removido dos favoritos` });
}
