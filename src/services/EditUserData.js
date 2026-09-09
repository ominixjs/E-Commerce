//=== Configs
import logger from "../configs/logger.js";
//=== Repositories
import { UserModel } from "../models/index.js";
//=== Utils
import AppError from "../utils/AppError.js";

export default async function EditUserData(userId, data) {
  // Procurar se há cadastro do cliente
  const user = await UserModel.findByPk(userId);
  if (user) throw new AppError("Usuário não cadastrado no banco de dados", 404);

  // Validar os campos de alterados
  // ...

  // Validar se email é temporario ou é fake
  // ...

  // Atualiza os campos que foram alterados
  await user.update(data);

  logger.info({
    id: userId,
    name: user.name,
    message: `Alterou os dados : ${user.changed()}`,
  });
}
