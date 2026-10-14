//=== Configs
import logger from "../../configs/logger.js";
//=== Models
import { OrderModel, PaymentModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function ChangePaymentMethod(user, orderId) {
    const paymentInstance = await PaymentModel.findOne({
        where: {
            orderId,
            status: "PENDING",
        },
        include: { model: OrderModel, attributes: ["status"] },
    });
    // Status para impedir cancelamento em processos avançados do pedido e do pagamento
    const statusReleased = ["PENDING", "DECLINED", "CANCELLED", "REFUNDED", "EXPIRED"];
    // Valida o status atual do pedido
    if (!statusReleased.includes(paymentInstance.status)) {
        throw new AppError(
            "Houve uma alteração no status do pedido. Mas informações veja Meus Pedidos ou entre em contato.",
            422,
        );
    }

    // Define o status do pagamento atual como Cancelado.
    // Agora fica liberado para criar um novo pagamento, só ir na aba do pedido e criar um novo.
    paymentInstance.update({ status: "CANCELLED" });

    logger.warn({
        id: user.id,
        orderId,
        paymentId: paymentInstance.id,
        message:
            "Usuário cancelou a forma atual de pagamento e poderá alterar a forma de pagamento",
    });
}
