import { Op } from "sequelize";

//=== Repositories
import { ProductModel, UserModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function Pagination(user, page, filters, type) {
    page = parseInt(page);
    if (isNaN(page) || page <= 0) {
        throw new AppError("Paginação não disponivel", 400);
    }

    // Valores de paginação
    const limitItens = 1;
    const offset = (page - 1) * limitItens; // Reduzir 1 da variavel page indicadora da pagina
    const limit = offset + limitItens;

    // Campos para filtragem
    const { search, sort, order } = filters;

    // Criando e definindo propriedades ao metodo de buscar where
    const where = {};

    // Atibui a propriedade de busca
    if (search) {
        where.name = {
            [Op.like]: `%${search}%`,
        };
    }

    // Campos válidos para a entrada de sort e order
    // Uma forma de controlar o dados vindos do cliente
    const allowedSorts = ["name", "price", "createdAt"];
    const sortField = allowedSorts.includes(sort) ? sort : "createdAt";

    const allowedOrdes = ["DESC", "ASC"];
    const orderField = allowedOrdes.includes(order) ? order : "DESC";

    // Adiciona aqui os includes em caso de busca de associações
    const include = [];

    // Caso liste os produtos favoritados do usuário, busca pelo id do usuário logado
    if (type == "favorite") {
        include.push({ model: UserModel, where: { id: user.id } });
    }

    // Solicita os produtos
    const { count, rows } = await ProductModel.findAndCountAll({
        where,
        include,
        order: [[sortField, orderField]],
        limit,
        offset,
        distinct: true, // evitando duplicações na contagem de count
    });

    // Quantidade de paginas
    const allPages = Math.ceil(count / limitItens);

    // Limites de paginação
    const previousPage = offset > 0 ? true : false;
    const nextPage = page < allPages ? true : false;

    // Definir propriedades
    return { count, allPages, previousPage, nextPage, rows };
}
