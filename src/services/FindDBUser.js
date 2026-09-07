//=== Repositories
import * as UserRepository from "../repositories/Users.js";
//=== Utils
import AppError from "../utils/AppError.js";

export default async function FindDBUser(id) {
    const userInstance = await UserRepository.Find(id);
    if (!userInstance) throw new AppError("Usuário não cadastrado no banco de dados", 404);

    return userInstance;
}
