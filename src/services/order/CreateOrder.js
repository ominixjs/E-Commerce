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
    AddressModel,
} from "../../models/index.js";

//=== Utils
import AppError from "../../utils/AppError.js";
import FormatCurrencyValue from "../../utils/FormatCurrencyValue.js";

export default async function CreateOrder(user, addressId) {
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
    // Definir metodo para troca moeda se necessário
    total = FormatCurrencyValue(total, "pt-BR", "BRL");

    // Busca endereço no banco
    const addressInstace = await AddressModel.findByPk(addressId);
    if (!addressInstace) {
        throw new AppError("Endereço inválido ou não foi localizado", 404);
    }

    // Cria pedido
    const orderId = nanoid(10);
    await OrderModel.create({
        id: orderId,
        userId: user.id,
        status: "PENDING",
        total,

        shippingStreet: addressInstace.street,
        shippingNumber: addressInstace.number,
        shippingCity: addressInstace.city,
        shippingState: addressInstace.state,
        shippingComplement: addressInstace.complement,
        shippingZipCode: addressInstace.zip,
        shippingType: addressInstace.type,
    });

    // Salva lista de produtos do pedido
    for (const item of cart.CartItems) {
        const price = item.Product.price;
        const calcPrice = price * item.quantity;
        const subtotal = FormatCurrencyValue(calcPrice, "pt-BR", "BRL");

        await OrderItemModel.create({
            id: nanoid(10),
            productId: item.Product.id,
            orderId: orderId,
            quantity: item.quantity,
            price: FormatCurrencyValue(price, "pt-BR", "BRL"),
            subtotal,
        });
    }

    logger.info({
        id: user.id,
        name: user.name,
        orderId,
        message: "Usuário criou um pedido",
    });

    // Identificação do pedido e continua para o pagamento
    return { orderId };
}
