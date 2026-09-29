//=== Repositories
import { CartModel, CartItemModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function CartProductList(userId) {
    // lista de produtos do carrinho
    // Encontra usuário e ao instanciar o include primário, torna a busca para carrinho do usuário.
    const cart = await CartModel.findOne({
        where: { userId },
        include: [
            {
                model: CartItemModel,
            },
        ],
    });

    if (!cart) {
        throw new AppError("Carrinho esta vazio", 404);
    }

    return cart;
}
