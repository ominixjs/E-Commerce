import jwt from "jsonwebtoken";

//=== Utils
import AppError from "../utils/AppError.js";

export default async function AuthMiddleware(req, res, next) {
    // Pega token do cabeçalho da requisição
    const AuthHeader = req.headers.authorization;

    // Validar se há um token válido
    if (!AuthHeader) {
        throw new AppError("Token não fornecido", 401);
    }

    // Separar as partes esquema e token da string
    const parts = AuthHeader.split(" ");
    const [scheme, token] = parts;

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ message: "Formato de autorização inválido" });
    }

    // Valida token com a chave secreta
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Injeta dados do token no objeto da requisição
    req.user = { name: decoded.name, id: decoded.id };

    return next();
}
