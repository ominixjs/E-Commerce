//=== Services
import FindUserDB from "../services/user/FindUserDB.js";
import EditUserData from "../services/user/EditUserData.js";
import DeleteUser from "../services/user/DeleteUser.js";
import ListUsers from "../services/ListUsers.js";

export async function Users(req, res) {
    // Lista de usuários
    const users = await ListUsers();
    return res.status(200).json(users);
}

export async function Edit(req, res) {
    // Função de alterar dados do usuário
    await EditUserData(req.user.id, req.body);

    // Carregar dados do usuário logado
    const user = await FindUserDB(req.user.id);

    return res.status(201).json(user);
}

export async function Delete(req, res) {
    // Validação e deleção de dados
    await DeleteUser(req.user);

    return res.status(200).json({
        message:
            "Você deletou sua conta, aguarde aos próximos instance para confirmação pelo email.",
    });
}
