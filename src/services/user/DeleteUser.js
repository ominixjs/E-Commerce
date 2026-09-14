//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { UserModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function DeleteUser(userId, email) {
    // Valida cadastro do usuário
    const user = await UserModel.findByPk(userId);
    if (!user) {
        throw new AppError("Usuário não cadastrado no banco de dados", 404);
    }

    // Deleção do usuário
    await UserModel.destroy({ where: { id: userId } });

    logger.info({ id: userId, email: email, message: "Usuário deletou a conta" });
}
