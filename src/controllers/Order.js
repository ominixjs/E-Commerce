import CreateOrder from "../services/order/CreateOrder.js";
import CancelCustomerOrder from "../services/order/CancelCustomerOrder.js";

export async function Orders(req, res) {
    // Cria uma pedido
    await CreateOrder(req.user, req.body.addressId);

    return res.status(200).json("Pedido finalizado");
}

export async function Cancel(req, res) {
    // Valida requisitos e cancela pedido
    await CancelCustomerOrder(req.user, req.params.id);

    res.status(200).json({ message: "pedido cancelado com sucesso" });
}
