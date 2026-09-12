//=== Services
import FindUserDB from "../services/FindUserDB.js";
import LoginUser from "../services/LoginUser.js";
import CreateUser from "../services/CreateUser.js";
import ListUsers from "../services/ListUsers.js";
import EditUserData from "../services/EditUserData.js";
import DeleteUser from "../services/DeleteUser.js";

export async function Users(req, res) {
    // Lista de usuários
    const users = await ListUsers();
    return res.status(200).json(users);
}

export async function Login(req, res) {
    // Sistema de login de usuário
    const token = await LoginUser(req.body);

    // Gerar um cookie
    res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Exibe o token
    return res.status(200).json({ token });
}

export async function Create(req, res) {
    // Valida e cria uma nova conta
    await CreateUser(req.body);

    return res.status(200).json({ success: "Conta criada com sucesso." });
}

export async function Edit(req, res) {
    // Função de alterar dados do usuário
    await EditUserData(req.params.id, req.body);

    // Carregar dados do usuário logado
    const user = await FindUserDB(req.params.id);

    return res.status(201).json(user);
}

export async function Delete(req, res) {
    // Validação e deleção de dados
    await DeleteUser(req.params.id, "Receber nome de token");

    return res.status(200).json({
        message:
            "Você deletou sua conta, aguarde aos próximos instance para confirmação pelo email.",
    });
}
