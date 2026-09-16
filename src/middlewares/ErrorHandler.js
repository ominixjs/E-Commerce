import { ZodError } from "zod";
import jwt from "jsonwebtoken";

//=== Configs
import logger from "../configs/logger.js";
//=== Utils
import AppError from "../utils/AppError.js";

// trata erros da aplicação
export default function ErrorHandler(error, req, res, _next) {
    // Instancias de erros manuais
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ status: "error", message: error.message });
    }

    // Tratamento de erros de validação de formulários
    if (error instanceof ZodError) {
        return res.status(422).json({
            status: "erro_validacao",
            mensagem: "Dados enviados são inválidos.",
            erros: error.flatten().fieldErrors, // Formato limpo por campo
        });
    }

    // Tratamento para erros na instancia do JWT
    if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
            status: "erro_token",
            mensagem: "Token inválido ou expirado",
        });
    }

    // Visualizar erros em desenvolvimento
    logger.error(`👀 Error não tratado : ${error}`);

    // Erros da aplicação não indetificados
    return res.status(500).json({ status: "error", message: "Error interno do servidor" });
}
