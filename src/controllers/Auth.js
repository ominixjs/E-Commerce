import LoginUser from "../services/user/LoginUser.js";
import CreateUser from "../services/user/CreateUser.js";

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