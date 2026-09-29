//=== Repositories
import { UserModel, AddressModel, CartModel, CartItemModel } from "../models/index.js";
//=== Utils
import AppError from "../utils/AppError.js";

// Buscar dados do cliente para exibição
export default async function ListUsers() {
    const users = await UserModel.findAll({
        include: [{ model: AddressModel }, { model: CartModel, include: { model: CartItemModel } }],
    });
    if (!users) {
        throw new AppError("Error ao localizar usuários no banco de dados", 404);
    }

    return users;
}
