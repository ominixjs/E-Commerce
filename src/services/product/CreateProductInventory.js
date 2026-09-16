import { nanoid } from "nanoid";
import slugify from "slugify";

//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { ProductModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";
import ProductSchame from "../../utils/ProductSchame.js";

export default async function CreateProductInventory(user, data) {
    // Valida cada campo de entrada antes de prosseguir com a criação do estoque
    // O schame não trata mais ou menos propriedades, com isso não há procupação com dados incompletos
    const validProductData = ProductSchame.safeParse(data);
    if (!validProductData.success) {
        const erros = validProductData.error.flatten().fieldErrors;
        throw new AppError(erros, 422);
    }

    // Validar se já há produto no sistema
    const checkDatabaseProduct = await ProductModel.findOne({ where: { name: data.name } });
    if (checkDatabaseProduct) {
        throw new AppError("Produto já esta cadastrado", 409);
    }

    data = {
        id: nanoid(10), // Uma ID do estoque
        slug: slugify(data.name.toLowerCase()),
        ...data,
    };

    // Cria um novo estoque
    await ProductModel.create(data);

    // log de aviso
    logger.info({ id: user.id, name: user.name, message: "Estoque criado com sucesso" });
}
