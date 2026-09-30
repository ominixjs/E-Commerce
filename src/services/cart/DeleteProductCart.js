//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { CartModel, CartItemModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function DeleteProductCart(user, productId) {
    // Valida e salva instancia
    const cartItem = await CartItemModel.findOne({
        where: {
            productId,
        },
        include: { model: CartModel, where: { userId: user.id } },
    });

    if (!cartItem) {
        throw new AppError("Produto não localizado, atualize sua seção", 404);
    }

    cartItem.destroy();

    logger.info({
        id: user.id,
        name: user.name,
        productId,
        message: "Usuário deletou produto do carrinho",
    });
}
