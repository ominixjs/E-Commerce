import CreateOrder from "../services/order/CreateOrder.js";

export async function Orders(req, res) {
    // Cria uma pedido
    await CreateOrder(req.user);

    return res.status(200).json("Pedido finalizado");
}
