import { Op, literal } from "sequelize";

//=== Repositories
import { ProductModel } from "../../models/index.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function Pagination(user, page, filters, type) {
    page = parseInt(page);
    if (isNaN(page) || page <= 0) {
        throw new AppError("Paginação não disponivel", 400);
    }

    // Campos para filtragem
    const { search, sort, order } = filters;
    // Criando e definindo propriedades ao metodo de buscar where.
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
    // Define um EXITS para criar uma propriedade pra validar se
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

    // Valores de paginação
    const limit = parseInt(filters.limit) || 12;
    const offset = (page - 1) * limit; // Reduzir 1 da variavel page indicadora da pagina

    // Solicita os produtos
    const { count, rows } = await ProductModel.findAndCountAll({
        where,
        order: [[sortField, orderField]],
        attributes,
        limit,
        offset,
        distinct: true, // evitando duplicações na contagem de count
    });

    // Ajusta valor de propriedade para true/false
    const newRows = rows.map((product) => {
        // Cria um json da instancia do produto
        const data = product.toJSON();
        // Converte valor em true/false
        return { ...data, isFavorite: Boolean(data.isFavorite) };
    });

    // Quantidade de paginas
    const allPages = Math.ceil(count / limit);

    // Limites de paginação
    const previousPage = offset > 0 ? true : false;
    const nextPage = page < allPages ? true : false;

    // Definir propriedades
    return { count, allPages, previousPage, nextPage, newRows };
}
