import CreateOrder from "../services/order/CreateOrder.js";
import CancelCustomerOrder from "../services/order/CancelCustomerOrder.js";

export async function Orders(req, res) {
    // Cria uma pedido
    const { orderId } = await CreateOrder(req.user, req.body.addressId);

    return res.status(200).json({
        message: `Pedido ${orderId} feito com sucesso`,
    });
}

export async function Cancel(req, res) {
    // Valida requisitos e cancela pedido
    await CancelCustomerOrder(req.user, req.params.id);

    res.status(200).json({ message: "Pedido cancelado com sucesso" });
}
