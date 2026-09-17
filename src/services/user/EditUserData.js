//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { UserModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";
import UserSchame from "../../utils/UserSchame.js";

export default async function EditUserData(userId, data) {
    // Esta definido campos que podem ser alterados e o front envia exatamente esses campos
    const validateModiFields = UserSchame.pick({
        name: true,
        email: true,
        birthday: true,
    });

    // O front envia todos os campos editaveis: email, name...
    // Campos marcados para não serem alterados não são envidados.
    // Também é usado metodo do sequelize para alterar apenas os campos que mudaram em relação a primeira instancia do usuário
    const validFields = validateModiFields.safeParse(data);
    if (!validFields.success) {
        const erros = validFields.error.flatten().fieldErrors;
        throw new AppError(erros, 422);
    }

    // Procurar se há cadastro do cliente e gera uma instacia se houver
    const user = await UserModel.findByPk(userId);
    if (!user) {
        throw new AppError("Usuário não cadastrado no banco de dados", 404);
    }

    // Validar se email é temporario ou é fake
    // ...

    // Alterando instancia para verificar e há alterações
    user.set(data);

    // Confere alterações, se não houve finaliza a função
    if (!user.changed()) {
        throw new AppError("Nenhuma alteração foi realizada", 200);
    }

    // O sequelize valida e altera apenas os campos de mudaram em relação a instancia
    await user.save();

    logger.info({
        id: userId,
        email: user.email,
        message: `Alterou os dados`,
    });
}
