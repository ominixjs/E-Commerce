import ValidateAndPayForOrder from "../services/payment/ValidateAndPayForOrder.js";
import AsaasWebhook from "../services/payment/AsaasWebhook.js";

export async function Payment(req, res) {
    // Valida pedido e cria status de pagamento.
    // Pix retorna uma url para pagamento.
    // Cartão retorna uma mensagem.
    const payment = await ValidateAndPayForOrder(req.user, req.body.orderId, req.body.method);

    const message = {
        PIX: payment,
        DEBIT_CARD: "Pagamento realizado",
        CREDIT_CARD: "Pagamento realizado",
    };
    return res.status(200).json({
        message: message[req.body.method],
    });
}

export async function ReceiveAsaasWebhook(req, res) {
    // Pega token da requisição
    const webhookToken = req.get("asaas-access-token");

    // Valida pagamentos
    await AsaasWebhook(webhookToken, req.body);

    return res.status(200).json({ received: true });
}
