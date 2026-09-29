import { nanoid } from "nanoid";

//=== Configs
import logger from "../../configs/logger.js";
//=== Models
import { ProductModel, FavoriteModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function AddProductToFavorites(user, productId) {
    // Valida estoque de produto
    let productInstance = await ProductModel.findByPk(productId);
    if (!productInstance) {
        throw new AppError("Produto não esta cadastrado no sistema", 404);
    }
    // Valida apenas cadastro
    // Limpa instancia na memoria
    productInstance = null;

    // Valida se o usuário já favoritou esse produto
    let favoriteInstance = await FavoriteModel.findOne({
        where: {
            userId: user.id,
            productId,
        },
    });
    if (favoriteInstance) {
        throw new AppError("Produto já esta favoritado", 200);
    }
    // Valida registro de produto
    // Limpa instancia na memoria
    favoriteInstance = null;

    // Adiciona produto aos favoritos
    // Registra na tabela userId e productId
    const id = nanoid(10);
    await FavoriteModel.create({ id, userId: user.id, productId });

    logger.info({
        id: user.id,
        name: user.name,
        productId,
        FavoriteId: id,
        message: "Usuário adicionou produto aos favoritos",
    });
}
