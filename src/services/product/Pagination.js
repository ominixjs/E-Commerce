import { Op, literal } from "sequelize";

//=== Repositories
import { ProductModel, UserModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

const models = {
    product: ProductModel,
    favorite: UserModel,
};

export default async function Pagination(user, page, filters, type) {
    page = parseInt(page);
    if (isNaN(page) || page <= 0) {
        throw new AppError("Paginação não disponivel", 400);
    }

    // Valida os filtros vindos do front
    const validFilters = filteringMethods(user, filters);

    // Define que lista vai ser criada para todos os produtos ou favoritos
    let listingMethod;

    if (type === "product") {
        // listagem direta usando o modelo de produtos e metodos de filtragem
        listingMethod = validFilters;
    }

    if (type === "favorite") {
        // Lista usando a propriedade include os produtos favoritados.
        // Como a lista de favoritos usa o modelo do usuário, então para segurança e para localizar é usado o ID
        listingMethod = {
            where: { id: user.id },
            attributes: [],
            include: [{ model: ProductModel, ...validFilters }],
        };
    }

    // Valores de paginação
    const limit = parseInt(filters.limit) || 12;
    const offset = (page - 1) * limit; // Reduzir 1 da variavel page indicadora da pagina

    // Define o modelo da instancia
    const model = models[type];

    // Solicita os produtos
    const { count, rows } = await model.findAndCountAll({
        ...listingMethod,
        limit,
        offset,
        distinct: true, // Evitar duplicações na contagem do count
    });

    // Valida formato da instancia para evitar erros de iterações.
    const productList = Boolean(rows[0]?.Products) ? rows[0].Products : rows;
    const products = productList.map((product) => {
        const data = product.toJSON();
        // Formata a instancia para o front end.
        // Ajusta valor de propriedade para true/false.
        return { ...data, isFavorite: Boolean(data.isFavorite) };
    });

    // Quantidade de paginas
    const allPages = Math.ceil(count / limit);

    // Limites de paginação
    const previousPage = offset > 0 ? true : false;
    const nextPage = page < allPages ? true : false;

    // Definir propriedades
    return { count, allPages, previousPage, nextPage, products };
}

function filteringMethods(user, filters) {
    // Campos para filtragem
    const { search, sort, order } = filters;
    // Criando propriedades para buscar item.
    const where = {};

    // Atribui a propriedade de busca
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

    // Define um EXITS para criar uma propriedade e validar se
    // produto esta favoritado.
    const attributes = {
        include: [
            [
                literal(`
                    EXISTS (
                        SELECT 1
                        FROM favorites AS f
                        WHERE f.productId = Products.id
                        AND f.userId = "${user.id}"
                    )
                    `),
                "isFavorite",
            ],
        ],
    };

    return { where, order: [[sortField, orderField]], attributes };
}
