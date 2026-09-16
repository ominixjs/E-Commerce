//=== Configs
import logger from "../../configs/logger.js";
//=== Repositories
import { ProductModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function Pagination(page) {
    // Tratar possiveis tipos inválidos e converte valor para number
    page = parseInt(page);
    if (isNaN(page)) {
        throw new AppError("Paginação não disponivel", 400);
    }

    // Valores de paginação
    const limitPage = 20;
    const offset = (page - 1) * limitPage; // Reduzir 1 da variavel page indicadora da pagina
    const limit = offset + limitPage;

    // Solicita os produtos
    const productList = await ProductModel.findAndCountAll({ limit, offset });

    return productList;
}
