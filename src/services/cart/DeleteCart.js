//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { CartItemModel, CartModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function DeleteProductCart(user) {
    // Valida e salva instancia
    const cart = await CartModel.findOne({
        where: {
            userId: user.id,
        },
    });

    if (!cart) {
        throw new AppError("Carrinho de produtos não localizado, atualize sua seção", 404);
    }

    // Delete carrinho com itens
    await CartItemModel.destroy({
        where: {
            cartId: cart.id,
        },
    });

    logger.info({
        id: user.id,
        name: user.name,
        message: "Usuário deletou o carrinho",
    });
}
