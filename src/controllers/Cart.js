import CartProductList from "../services/cart/CartProductList.js";
import AddProductCart from "../services/cart/AddProductCart.js";

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
    return res.status(200).json({ message: "Carrinho Editar" });
}

export async function Remove(req, res) {
    return res.status(200).json({ message: "Carrinho Remover" });
}

export async function RemoveAll(req, res) {
    return res.status(200).json({ message: "Carrinho Remover Tudo" });
}
