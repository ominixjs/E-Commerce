import { ZodError } from "zod";

//=== Configs
import logger from "../configs/logger.js";
//=== Utils
import AppError from "../utils/AppError.js";

// trata erros da aplicação
export default function ErrorHandler(error, req, res, next) {
    // Instancias de erros manuais
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ status: "error", message: error.message });
    }

    if (error instanceof ZodError) {
        return res.status(422).json({
            status: "erro_validacao",
            mensagem: "Dados enviados são inválidos.",
            erros: error.flatten().fieldErrors, // Formato limpo por campo
        });
    }

    // Visualizar erros em desenvolvimento
    logger.error(`👀 Error não tratado : ${error}`);

    // Erros da aplicação não indetificados
    return res.status(500).json({ status: "error", message: "Error interno do servidor" });
}
