import { nanoid } from "nanoid";

//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { ProductModel, CartModel, CartItemModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function CreateOrder(user, zip) {
    // Valida e localiza carrinho com os produtos
    const cart = await CartModel.findOne({
        where: {
            userId: user.id,
        },
        include: {
            model: CartItemModel,
            include: ProductModel,
        },
    });

    if (!cart || cart.CartItems.length <= 0) {
        throw new AppError("Carinho não localizado, atualize sua lista", 404);
    }

    // Valida quantidade e estoque dos produtos
    const is_validStock = cart.CartItems.some((item) => item.quantity > item.Product.stock);
    if (is_validStock) {
        throw new AppError("Produto sem estoque, atualize sua lista", 422);
    }

    // Calcular total para pagamento
    let total = 0;
    for (const item of cart.CartItems) {
        total += item.Product.price * item.quantity;
    }
    // Formata na moeda local
    total = (total / 100).toLocaleString("pt-BR", {
        
        















        
    });

    return {
        total,
    };
}
