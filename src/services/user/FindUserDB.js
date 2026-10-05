//=== Repositories
import { UserModel, CartModel, AddressModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

// Buscar dados do cliente para exibição
export default async function FindDBUser(id) {
    const include = [];

    // Valida se usuário possui algum endereço registrado
    const has_address = await AddressModel.findOne({
        where: {
            userId: id,
        },
    });
    if (Boolean(has_address)) {
        include.push({
            model: AddressModel,
        });
    }

    // Define associações
    include.push({ model: CartModel });

    // Cria uma instancia do usuário
    const user = await UserModel.findByPk(id, {
        include,
    });
    if (!user) {
        throw new AppError("Usuário não cadastrado no banco de dados", 404);
    }

    return user;
}
