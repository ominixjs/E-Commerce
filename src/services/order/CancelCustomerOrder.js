//=== Models
import { OrderModel, PaymentModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function CancelCustomerOrder(user, orderId) {
    // Criar uma instancia do pedido
    const orderInstance = await OrderModel.findByPk(orderId);

    // Valida a criação do pedido
    if (!Boolean(orderInstance)) {
        throw new AppError("O pedido não foi localizado, atualize a lista.", 404);
    }

    // Caso o pedido esteja pago e ainda não tenha ido para o processamento em diante,
    // Cria processo de estorno.
    // ...

    // Status para impedir cancelamento em processos avançados do pedido e do pagamento
    const blockStatus = ["PROCESSING", "SHIPPED", "DELIVERED"];
    // Valida o status atual do pedido
    if (blockStatus.includes(orderInstance.status)) {
        throw new AppError(
            "Houve uma alteração no status do pedido. Mas informações veja Meus Pedidos ou entre em contato.",
            422,
        );
    }

    // Altera o status do pagamento atual em caso de pedido PENDING.
    const paymentInstance = await PaymentModel.findOne({
        where: {
            orderId: orderInstance.id,
            userId: user.id,
            status: "PENDING",
        },
    });
    if (blockStatus.includes(paymentInstance.status)) {
        await paymentInstance.update({ status: "CANCELLED" });
    }

    await orderInstance.update({ status: "CANCELLED" });
}
