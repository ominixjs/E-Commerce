import { Op, literal } from "sequelize";

//=== Configs
import sequelize from "../../configs/database.js";
//=== Repositories
import { ProductModel, FavoriteModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function PaginationFavorites(user, page, filters) {
    // Valida entrada da identificação da pagina
    if (isNaN(page)) {
        throw new AppError("Paginação não disponivel", 400);
    }

    // Queries
    const { search, sort, order } = filters;

    const where = {};
    if (search) {
        where.name = { [Op.like]: `%${search}%` };
    }

    // Campos válidos para a entrada de sort e order
    // Uma forma de controlar o dados vindos do cliente
    const allowedSorts = ["name", "price", "createdAt"];
    const sortField = allowedSorts.includes(sort) ? sort : "createdAt";

    const allowedOrdes = ["DESC", "ASC"];
    const orderField = allowedOrdes.includes(order) ? order : "DESC";

    // Valores de paginação
    const limit = parseInt(filters.limit) || 12;
    const offset = (page - 1) * limit; // Reduzir 1 da variavel page indicadora da pagina

    const { count, rows } = await FavoriteModel.findAndCountAll({
        where: { userId: user.id },
        attributes: [],
        include: [{ model: ProductModel, where, order: [[sortField, orderField]] }],
        limit,
        offset,
        distinct: true,
    });

    const products = rows.map((p) => {
        const data = p.toJSON();
        return { ...data.Product };
    });

    return { count, products };
}
