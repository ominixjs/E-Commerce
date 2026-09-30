import CartProductList from "../services/cart/CartProductList.js";
import AddProductCart from "../services/cart/AddProductCart.js";
import EditProductCart from "../services/cart/EditProductCart.js";
import DeleteProductCart from "../services/cart/DeleteProductCart.js";
import DeleteCart from "../services/cart/DeleteCart.js";

export async function Cart(req, res) {
    // Valida e busca o carrinho do usuário
    const cart = await CartProductList(req.user.id);

    return res.status(200).json(cart);
}

export async function Add(req, res) {
    // Valida e executa uma atualização ou cria um novo
    await AddProductCart(req.user, req.body.productId, req.body.quantity);

    return res.status(200).json({ message: "Carrinho alterado com sucesso" });
}

export async function Edit(req, res) {
    // Editar produto do carrinho
    await EditProductCart(req.user, req.params.id, req.body.action, req.body.quantity);

    return res.status(200).json({ message: "Carrinho editado" });
}

export async function Remove(req, res) {
    // Valida e deleta produto do carrinho
    await DeleteProductCart(req.user, req.params.id);

    return res.status(200).json({ message: "Você removeu o produto" });
}

export async function RemoveAll(req, res) {
    // Deletar todo o carrinho
    await DeleteCart(req.user);

    return res.status(200).json({ message: "Você removeu tudo" });
}
