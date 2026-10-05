//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { AddressModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function DeleteUserAddress(user, addressId) {
    // Valida e reutiliza instancia
    const addressInstance = await AddressModel.findByPk(addressId);
    if (!addressInstance) {
        throw new AppError("Endereço não localizado no banco de dados", 404);
    }

    // Deleção do usuário
    await addressInstance.destroy();

    logger.info({ id: user.id, name: user.name, message: "Usuário deletou um endereço" });
}
