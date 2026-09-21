//=== Configs
import logger from "../../configs/logger.js";
//=== Models
import { UserModel, ProductModel, FavoriteModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function GetProductStockData(user, productId) {
    // Validar cadastro de produto no estoque e pega instancia
    const productInstance = await ProductModel.findByPk(productId);
    if (!productInstance) {
        throw new AppError("Produto não esta cadastrado no sistema", 404);
    }

    // Validar se produto esta favoritado pelo usuário
    const is_favorited = await FavoriteModel.findOne({ where: { userId: user.id, productId } });

    return {
        is_favorited: Boolean(is_favorited),
        ...productInstance.dataValues,
    };
}
