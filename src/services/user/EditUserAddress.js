//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { AddressModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";
import AddressSchame from "../../utils/AddressSchame.js";

export default async function EditUserAddress(user, addressId, address) {
    // validão os campos de endereço
    const validUserAddress = AddressSchame.safeParse(address);
    if (!validUserAddress.success) {
        const erros = validUserAddress.error.flatten().fieldErrors;
        throw new AppError(erros, 422);
    }

    // Cria uma instancia
    const addressInstance = await AddressModel.findByPk(addressId);

    // Altera os campos da instancia e valida quais realmente foram alterados
    addressInstance.set(address);

    // Salva os campos que forma alterados
    await addressInstance.save();

    logger.info({
        id: user.id,
        message: "Alterou o campos do endereço",
    });
}
