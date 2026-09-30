import { nanoid } from "nanoid";

//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { ProductModel, CartModel, CartItemModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function AddProductCart(user, productId, quantity) {
    // Valida se produto esta cadastrado ou disponivel.
    const product = await ProductModel.findOne({ where: { id: productId } });
    if (!product) {
        throw new AppError("Produto não esta disponivel", 404);
    }

    // Verifica se o usuário possui um carrinho criado.
    const cart = await CartModel.findOne({
        where: { userId: user.id },
    });

    const cartItem = await CartItemModel.findOne({
        where: {
            cartId: cart.id,
            productId: product.id,
        },
    });

    // Validar entrada de quantidade
    if (isNaN(quantity) || quantity < 0) {
        throw new AppError("Quantidade inválida", 422);
    }
    // Converte para o tipo numerico
    quantity = parseInt(quantity);

    // Caso o produto ja esteja no carrinho, apenas atualiza a quantidade.
    if (cartItem) {
        // Valida estoque antes de começar os assicronos
        if (cartItem.quantity + quantity > product.stock) {
            throw new AppError("Estoque indiponivel", 422);
        }

        // Alteração de quantidade no carrinho
        cartItem.quantity += quantity;

        return await cartItem.save();
    }

    // Valida estoque antes de começar os assicronos
    if (quantity > product.stock) {
        throw new AppError("Estoque indiponivel", 422);
    }

    // Cria um carrinho com os dados enviados
    await CartItemModel.create({
        id: nanoid(10),
        cartId: cart.id,
        productId: product.id,
        quantity,
    });

    logger.info({
        id: user.id,
        name: user.name,
        cartId: user.id,
        productId,
        message: "Usuário alterou o carrinho",
    });
}
