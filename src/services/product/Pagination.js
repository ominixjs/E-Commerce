//=== Repositories
import { FavoriteModel, ProductModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

const models = {
    product: ProductModel,
    favorite: FavoriteModel,
};

export default async function Pagination(user, page, type) {
    // Tratar possiveis tipos inválidos e converte valor para number
    page = parseInt(page);
    if (isNaN(page)) {
        throw new AppError("Paginação não disponivel", 400);
    }

    const model = models[type];

    // Valores de paginação
    const limitPage = 20;
    const offset = (page - 1) * limitPage; // Reduzir 1 da variavel page indicadora da pagina
    const limit = offset + limitPage;

    // Esquema para obter dados da tabela associada ao usuário
    const where = type == "favorite" ? { userId: user.id } : null;

    // Solicita os produtos
    const pagination = await model.findAndCountAll({ where, limit, offset });

    // Definir propriedades
    return pagination;
}
