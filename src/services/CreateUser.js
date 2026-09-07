import { nanoid } from "nanoid";

//=== Configs
import logger from "../configs/logger.js";
//=== Repositories
import * as UserRepository from "../repositories/Users.js";
//=== Utils
import AppError from "../utils/AppError.js";
import registerSchame from "../utils/resgisterSchame.js";

export default async function CreateUser(data) {
    const validUserData = registerSchame.safeParse(data);
    if (!validUserData.success) {
        const erros = validUserData.error.flatten().fieldErrors;
        throw new AppError(erros, 422);
    }

    const user = await UserRepository.Search({ name: data.name });
    if (user) throw new AppError("Usuário já esta cadastrado", 409);

    const id = nanoid(10);

    await UserRepository.Create(id, data.name);

    logger.info({ id, name: data.name, message: "Conta criada com sucesso" });
}
