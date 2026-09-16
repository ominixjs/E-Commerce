import slugify from "slugify";

//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { ProductModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";
import ProductSchame from "../../utils/ProductSchame.js";

export default async function EditProductStock(user, productId, data) {
    // Valida campos de entrada
    // O front envia todos os campos e valido todos
    // Dados a serem salvo são apenas os que alteraram relativo ao banco
    const validProductData = ProductSchame.omit({ price: true }).safeParse(data);
    if (!validProductData.success) {
        const erros = validProductData.error.flatten().fieldErrors;
        throw new AppError(erros, 422);
    }

    // Cria uma propriedade slug gerada pela slugify assim garante que não mude apenas o nome
    // O banco só altera se for diferente do anterior como os outros dados
    if (data["name"]) {
        data = { slug: slugify(data.name.toLowerCase()), ...data };
    }

    // Valida produto no sistema
    // Instancia também é reaproveitada
    const productInstance = await ProductModel.findByPk(productId);
    if (!productInstance) {
        throw new AppError("Produto não esta cadastrado no sistema", 409);
    }

    // Altera instancia na memoria e registra campos alterados
    productInstance.set(data);

    // Pega os campos que foram alterados na instancia
    const changes = productInstance.changed() || "";

    // Confere alterações, se não houve finaliza a função
    if (!changes) {
        throw new AppError("Nenhuma alteração foi realizada", 200);
    }

    // Altera e salva no banco apenas os campos que divergiram com os dados do banco
    await productInstance.save();

    logger.info({
        id: user.id,
        name: user.name,
        productId,
        message: `Alteração feita com sucesso. Campos alterados: ${changes}`,
    });
}
