import { nanoid } from "nanoid";

//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { AddressModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";
import AddressSchame from "../../utils/AddressSchame.js";

export default async function AddUserAddress(user, address) {
    // validão os campos de endereço
    const validUserAddress = AddressSchame.safeParse(address);
    if (!validUserAddress.success) {
        const erros = validUserAddress.error.flatten().fieldErrors;
        throw new AppError(erros, 422);
    }

    // Para definir um endereço como padrão, não pode haver outro com o mesmo status.
    // Caso o usuário solicite uma alteração para um novo endereço como default, remove o endereço padrão.
    if (address.isDefault) {
        await AddressModel.update(
            { isDefault: false },
            {
                where: {
                    isDefault: address.isDefault,
                    userId: user.id,
                },
            },
        );
    }

    // Dados do endereço do cliente
    const userAddress = {
        id: nanoid(10),
        zip: address.zip,
        street: address.street,
        number: address.number,
        complement: address.complement,
        city: address.city,
        state: address.state,
        type: address.type,
        isDefault: address.isDefault,
        userId: user.id,
    };

    await AddressModel.create(userAddress);

    logger.info({ id: user.id, message: "Usuário adicionou um novo endereço" });
}
