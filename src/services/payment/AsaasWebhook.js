//=== Models
import { PaymentModel, OrderModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function AsaasWebhook(webhookToken, body) {
    // Valida token do webhook
    if (!Boolean(webhookToken) || webhookToken !== process.env.ASAAS_WEBHOOK_TOKEN) {
        throw new AppError("Webhook não autorizado", 401);
    }

    // Salva dados os dados retornados da requisição
    const { id: eventId, event, payment } = body;
    if (!Boolean(eventId) || !Boolean(event) || !Boolean(payment?.id)) {
        throw new AppError("Evento inválido", 401);
    }

    // Localiza pagamento pelo ID do pagamento
    const paymentInstance = await PaymentModel.findOne({
        where: {
            providerPaymentId: payment.id,
            status: "PENDING",
        },
    });

    // Retorna uma resposta ao cliente caso não haja atualizações
    if (!Boolean(paymentInstance)) {
        throw new AppError("Pagamento não localizado", 200);
    }

    // Confirmação do pedido
    if (event === "PAYMENT_RECEIVED" || event === "PAYMENT_CONFIRMED") {
        // Valida status para não alterar para o mesmo status de PAGO
        if (paymentInstance.status !== "PAID") {
            // Altera o status do pagamento
            await paymentInstance.update({ status: "PAID" });

            // Também altera o status do pedido
            await OrderModel.update({ status: "PAID" }, { where: { id: paymentInstance.orderId } });
        }
    }

    // Pagamento expirado
    // Adicionar logica para impedir uso do qrcode após expiração
    if (event === "PAYMENT_OVERDUE") {
        if (paymentInstance.status === "PENDING") {
            // Altera status
            await paymentInstance.update({ status: "EXPIRED" });
            await OrderModel.update(
                { status: "CANCELLED" },
                {
                    where: {
                        id: paymentInstance.orderId,
                        status: "PENDING",
                    },
                },
            );
        }
    }

    // Pagamento recusado
    if (event === "PAYMENT_REFUNDED") {
        // Altera status
        await paymentInstance.update({ status: "REFUNDED" });
        await OrderModel.update({ status: "REFUNDED" }, { where: { id: paymentInstance.orderId } });
    }

    // Reeambolso pendente
    if (event === "PAYMENT_REFUND_IN_PROGRESS") {
        await paymentInstance.update({
            status: "REFUND_PENDING",
        });
    }

    // Reembolso concluido
    if (event === "PAYMENT_PARTIALLY_REFUNDED") {
        await paymentInstance.update({
            status: "PARTIALLY_REFUNDED",
        });
    }
}
