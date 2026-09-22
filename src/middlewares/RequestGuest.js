import jwt from "jsonwebtoken";

import { jwt } from "zod";
//=== Utils
import AppError from "../utils/AppError.js";

export default function RequestGuest(req, res, next) {
    const authHeader = req.headers.authorization;

    // Se não houver autenticação, segue com a requisição
    if (!authHeader) {
        return next();
    }

    const [scheme, token] = authHeader.split(" ");
    // Valida formato de cabeçalho de autorização, se inválido, segue para login
    if (scheme !== "Bearer" || !token) {
        return next();
    }

    // No middleware de erros vai identificar essa instancia
    jwt.verify(token, process.env.JWT_KEY);

    // Usuário não pode acessar a rota estando logado
    throw new AppError("Usuário já esta logado", 409);
}
