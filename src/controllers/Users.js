//=== Services
import FindUserDB from "../services/user/FindUserDB.js";
import EditUserData from "../services/user/EditUserData.js";
import DeleteUser from "../services/user/DeleteUser.js";
import AddUserAddress from "../services/user/AddUserAddress.js";
import DeleteUserAddress from "../services/user/DeleteUserAddress.js";
import EditUserAddress from "../services/user/EditUserAddress.js";

export async function User(req, res) {
    // perfil do usuário
    const user = await FindUserDB(req.user.id);

    return res.status(200).json(user);
}

export async function Edit(req, res) {
    // Função de alterar dados do usuário
    await EditUserData(req.user.id, req.body);

    return res.status(201).json({ message: "Dados alterados com suceeso" });
}

export async function Delete(req, res) {
    // Validação e deleção de dados
    await DeleteUser(req.user);

    return res.status(200).json({
        message:
            "Você deletou sua conta, aguarde aos próximos instance para confirmação pelo email.",
    });
}

export async function CreateAddress(req, res) {
    // Criar um endereço
    await AddUserAddress(req.user, req.body);

    res.status(200).json({ message: "Endereço adicionado com sucesso" });
}

export async function EditAddress(req, res) {
    // Criar um endereço
    await EditUserAddress(req.user, req.params.id, req.body);

    res.status(200).json({ message: "Endereço editado com sucesso" });
}

export async function DeleteAddress(req, res) {
    // Criar um endereço
    await DeleteUserAddress(req.user, req.params.id);

    res.status(200).json({ message: "Endereço deletado com sucesso" });
}
