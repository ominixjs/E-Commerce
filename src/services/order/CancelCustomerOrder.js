//=== Models
import { OrderModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function CancelCustomerOrder(user, orderId) {
    // Criar uma instancia do pedido
    const orderInstance = await OrderModel.findByPk(orderId);

    // Valida a criação do pedido
    if (!Boolean(orderInstance)) {
        throw new AppError("O pedido não foi localizado, atualize a lista.", 404);
    }

    // Status para impedir cancelamento em processos avançados do pedido
    const blockStatus = ["SHIPPED", "DELIVERED", "CANCELLED"];
    // Valida o status atual do pedido
    if (blockStatus.includes(orderInstance.status)) {
        throw new AppError("O pedido já foi enviado, não da mais para cancelar.", 422);
    }

    await orderInstance.destroy();
}
