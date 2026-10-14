import CreateOrder from "../services/order/CreateOrder.js";
import CancelCustomerOrder from "../services/order/CancelCustomerOrder.js";
import OrderHistory from "../services/order/OrderHistory.js";
import ChangePaymentMethod from "../services/order/ChangePaymentMethod.js";

export async function Create(req, res) {
    // Cria uma pedido
    const { orderId } = await CreateOrder(req.user, req.body.addressId);

    return res.status(200).json({
        message: `Pedido ${orderId} feito com sucesso`,
        orderId,
    });
}

export async function History(req, res) {
    // Retorna uma lista com os pagamentos do usuário
    const orders = await OrderHistory(req.user);

    return res.status(200).json(orders);
}

export async function ChangeMethod(req, res) {
    // Valida requisitos e cancela metodo de pagamento
    await ChangePaymentMethod(req.user, req.params.orderId);

    res.status(200).json({ message: "Metodo de pagamento cancelado com sucesso" });
}

export async function Cancel(req, res) {
    // Valida requisitos e cancela pedido
    await CancelCustomerOrder(req.user, req.params.id);

    res.status(200).json({ message: "Pedido cancelado com sucesso" });
}
