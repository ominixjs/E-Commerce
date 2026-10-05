import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { UserModel, CartModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";
import UserSchame from "../../utils/UserSchame.js";

export default async function CreateUser(data) {
    // Validação do formulário de cadastro
    // Refine definido fora do escopo para não alterar tipo do objeto zod, assim conseguindo usar metodos pick() e omit()
    const validUserData = UserSchame.refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"], // Define qual campo receberá o erro
    }).safeParse(data);

    if (!validUserData.success) {
        const erros = validUserData.error.flatten().fieldErrors;
        throw new AppError(erros, 422);
    }

    // Confere se usuário esta cadastro
    const user = await UserModel.findOne({ where: { email: data.email } });
    if (user) {
        throw new AppError("Usuário já esta cadastrado", 409);
    }

    // Gera um ID personalizado
    const id = nanoid(10);

    // Gerar hash da senha
    const hash = await bcrypt.hash(data.password, 12);

    // Dados do cliente
    const userData = {
        id,
        name: data.name,
        email: data.email,
        birthday: data.birthday,
        password: hash,
        // Os termos serão adicionados em uma array
        termsAccepted: [
            {
                version: "v1.0",
                type: "Termos de uso e privacidade",
                accepted: data.termsUseAndPrivacy,
                date: new Date().toISOString(),
            },
        ],
    };

   

    await UserModel.create(userData);
    await CartModel.create({ id: nanoid(10), userId: id }); // carrinho do cliente

    logger.info({ id, email: data.email, message: "Conta criada com sucesso" });
}
