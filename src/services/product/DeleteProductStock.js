//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { ProductModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function DeleteProductStock(user, productId) {
    // Valida produto no sistema
    // Instancia também é reaproveitada
    const productInstance = await ProductModel.findByPk(productId);
    if (!productInstance) {
        throw new AppError("Produto não esta cadastrado no sistema", 404);
    }

    // Deleta dados do produto e suas associações
    await productInstance.destroy();

    logger.info({
        id: user.id,
        name: user.name,
        productId,
        message: "Produto deletado do banco de dados",
    });
}
