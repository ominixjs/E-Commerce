//=== Services
import FindUserDB from "../services/FindUserDB.js";
import LoginUser from "../services/LoginUser.js";
import CreateUser from "../services/CreateUser.js";
import ListUsers from "../services/ListUsers.js";
import EditUserData from "../services/EditUserData.js";

export async function Users(req, res) {
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
    await CreateUser(req.body);
    return res.status(200).json({ success: "Conta criada com sucesso" });
}

export async function Edit(req, res) {
    // Função de alterar dados do usuário
    await EditUserData(req.params.id, req.body);

    // Carregar dados do usuário logado
    const user = await FindUserDB(req.params.id);

    return res.status(200).json(user);
}

export function Delete(req, res) {
    return res.status(200).json({ success: "Hello World" });
}
