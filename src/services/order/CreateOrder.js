import { nanoid } from "nanoid";

//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import {
    ProductModel,
    CartModel,
    CartItemModel,
    OrderModel,
    OrderItemModel,
} from "../../models/index.js";
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
    total = FormatCurrencyValue(total, "pt-BR", "BRL");

    // Cria pedido
    await OrderModel.create({
        id: nanoid(10),
        userId: user.id,
        status: "PENDING",
        total,
    });

    // Salva os pedidos
    for (const item of cart.CartItems) {
        const price = item.Product.price;
        const calcPrice = price * item.quantity;
        const subtotal = FormatCurrencyValue(calcPrice, "pt-BR", "BRL");

        await OrderItemModel.create({
            id: nanoid(10),
            productId: item.Product.id,
            quantity: item.quantity,
            price: FormatCurrencyValue(price, "pt-BR", "BRL"),
            subtotal,
        });
    }
}

function FormatCurrencyValue(value, language = "pt-BR", currency = "BRL") {
    return (value / 100).toLocaleString(language, {
        style: "currency",
        currency,
    });
}
