import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

//=== Configs
import logger from "../../configs/logger.js";
//=== Models
import { UserModel, CartModel } from "../../models/index.js";
//=== Services
import CreateAsaasCustomer from "../asaas/CreateAsaasCustomer.js";
//=== Utils
import AppError from "../../utils/AppError.js";
import UserSchame from "../../utils/UserSchame.js";
import CpfSchame from "../../utils/CPFSchame.js";

export default async function CreateUser(data) {
    console.log(data);

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

    // Valida CPF enviado pelo cliente
    const validCPF = CpfSchame.safeParse(data.cpf);

    if (!validCPF.success) {
        const erros = CpfSchame.error.flatten().fieldErrors;
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

    // Cria cadastro no Asaas e gera uma identificação para operações finaceiras
    const asaasCustomerId = await CreateAsaasCustomer(data);
    if (!asaasCustomerId) {
        throw new AppError("Não foi possivel concluir o cadastro no momento. Customer-failed", 422);
    }

    // Dados do cliente
    const userData = {
        id,
        name: data.name,
        email: data.email,
        cpf: data.cpf,
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
        asaasCustomerId,
    };

    await UserModel.create(userData);
    await CartModel.create({ id: nanoid(10), userId: id }); // carrinho do cliente

    logger.info({ id, email: data.email, message: "Conta criada com sucesso" });
}
