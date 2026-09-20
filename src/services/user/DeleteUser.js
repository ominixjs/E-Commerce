//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { UserModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function DeleteUser(user) {
    // Valida cadastro do usuário
    // Reutiliza instancia
    const userInstance = await UserModel.findByPk(user.id);
    if (!userInstance) {
        throw new AppError("Usuário não cadastrado no banco de dados", 404);
    }

    // Deleção do usuário
    await userInstance.destroy();

    logger.info({ id: user.id, name: user.name, message: "Usuário deletou a conta" });
}
