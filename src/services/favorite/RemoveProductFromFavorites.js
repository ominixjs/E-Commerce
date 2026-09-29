//=== Configs
import logger from "../../configs/logger.js";
//=== Models
import { FavoriteModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function RemoveProductFromFavorites(user, productId) {
    // Valida se o usuário já favoritou esse produto
    const favoriteInstance = await FavoriteModel.findOne({
        where: {
            userId: user.id,
            productId,
        },
    });
    if (!favoriteInstance) {
        throw new AppError("Produto não esta favoritado", 404);
    }

    // Reutiliza instancia após a validação de favoritado
    // Apaga o registro da tabela
    await favoriteInstance.destroy();

    logger.info({
        id: user.id,
        name: user.name,
        productId,
        favoriteId: favoriteInstance.id,
        message: "Usuário removeu produto dos favoritos",
    });
}
