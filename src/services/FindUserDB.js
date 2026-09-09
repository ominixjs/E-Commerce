//=== Repositories
import { UserModel } from '../models/index.js';
//=== Utils
import AppError from '../utils/AppError.js';

// Buscar dados do cliente para exibição
export default async function FindDBUser(id) {
    const user = await UserModel.findByPk(id);
    if (!user) throw new AppError('Usuário não cadastrado no banco de dados', 404);

    return user;
}
