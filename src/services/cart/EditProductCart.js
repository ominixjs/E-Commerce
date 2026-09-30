//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { CartModel, CartItemModel, ProductModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function EditProductCart(user, productId, action, quantity) {
    const possibleActions = ["decrease", "increase"];
    if (!action || !possibleActions.includes(action)) {
        throw new AppError("Ação não explicita, tente novamente", 422);
    }

    // Validar entrada de quantidade
    if (isNaN(quantity) || quantity < 0) {
        throw new AppError("Quantidade inválida", 422);
    }
    // Converte para o tipo numerico
    quantity = parseInt(quantity);

    // Valida e retorna instancia do produto
    const cartItem = await CartItemModel.findOne({
        where: {
            productId,
        },
        include: {
            model: CartModel,
            where: {
                userId: user.id,
            },
        },
    });

    if (!cartItem) {
        throw new AppError("Produto não localizado, atualize sua seção", 404);
    }

    // Validar e comparar estoque de produto
    const productInstance = await ProductModel.findByPk(productId);
    if (!productInstance) {
        throw new AppError("Produto não esta desponivel", 404);
    }

    // Ações de decrescentar e acrescentar valor
    if (action === "decrease") {
        cartItem.quantity -= quantity;
    }

    if (action === "increase") {
        cartItem.quantity += quantity;
    }

    // Valida estoque para incrementar a quantidade requisitada
    if (cartItem.quantity > productInstance.stock) {
        throw new AppError("Estoque indisponivel", 422);
    }

    if (cartItem.quantity < 1) {
        cartItem.destroy();
        return;
    }

    cartItem.save();

    logger.info({
        id: user.id,
        name: user.name,
        productId,
        message: "Usuário editou o carrinho",
    });
}
