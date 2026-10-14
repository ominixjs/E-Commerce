//=== Models
import { UserModel, PaymentModel, OrderModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function OrderHistory(user) {
    // Valida usuário e busca pedidos
    const { Orders } = await UserModel.findByPk(user.id, {
        attributes: [],
        include: {
            model: OrderModel,
            include: PaymentModel,
        },
    });
    if (!Boolean(Orders)) {
        throw new AppError("Houve erro ao localizar seus pedidos.", 404);
    }

    return Orders;
}
