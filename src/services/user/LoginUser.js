import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// === Configs
import logger from "../../configs/logger.js";
// === Repositories
import { UserModel } from "../../models/index.js";
// === Utils
import AppError from "../../utils/AppError.js";
import UserSchame from "../../utils/UserSchame.js";

export default async function LoginUser(data) {
    //  Esquema zod para validar dados do login
    const fieldsForValidation = UserSchame.pick({
        email: true,
        password: true,
        termsUseAndPrivacy: true,
    });

    //  Validação do formulário de cadastro
    const validateLoginFields = fieldsForValidation.safeParse(data);
    if (!validateLoginFields.success) {
        const erros = validateLoginFields.error.flatten().fieldErrors;
        throw new AppError(erros, 422);
    }

    //  Procura pelo usuário no DB
    const user = await UserModel.findOne({ where: { email: data.email } });
    if (!user) {
        throw new AppError("Usuário não cadastrado no banco de dados", 404);
    }

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
        throw new AppError("Senha incorreta", 422);
    }

    //  Gerar um token
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_KEY, {
        expiresIn: "15m",
    });

    //  Log de aviso
    logger.info({ id: user.id, email: data.email, message: "Usuário acessou a conta" });

    //  proxima etapa gerar um cookie para validar os logins
    return token;
}
