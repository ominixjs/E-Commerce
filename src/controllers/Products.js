//=== Services
import Pagination from "../services/product/Pagination.js";
import CreateProductInventory from "../services/product/CreateProductInventory.js";
import EditProductStock from "../services/product/EditProductStock.js";

export async function Products(req, res) {
    // Lista com os produtos prontos para paginação e filtragem
    const productList = await Pagination(req.params.page);

    return res.status(200).json(productList);
}

export async function Create(req, res) {
    // Valida e cria estoque de produtos
    await CreateProductInventory(req.user, req.body);

    return res.status(200).json("Estoque criado com sucesso");
}

export async function Edit(req, res) {
    // Valida e edita dados do produto
    await EditProductStock(req.user, req.params.id, req.body);

    return res.status(200).json("Produto editado com sucesso");
}
