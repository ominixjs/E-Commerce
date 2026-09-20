//=== Models
import UserModel from "./User.js";
import AddressModel from "./Address.js";
import ProductModel from "./Product.js";
import FavoriteModel from "./Favorite.js";
import sequelize from "../configs/database.js";

// Associações -->
UserModel.hasMany(AddressModel, {
    foreignKey: "userId",
    onDelete: "CASCADE", // Deleta a associação quando o usuário for deletado
    hooks: true, // Garante que os hooks do Sequelize também rodem nos filhos, se necessário
});
AddressModel.belongsTo(UserModel, { foreignKey: "addressId" });

// Cria uma associação para produtos definidos como favoritos.
// Essa associação defina uma tabela intermediaria entre Usuário e Produto.
UserModel.belongsToMany(ProductModel, {
    through: FavoriteModel, // Tabela intermediária
    foreignKey: "userId",
    otherKey: "productId",
});
ProductModel.belongsToMany(UserModel, {
    through: FavoriteModel, // Tabela intermediária
    foreignKey: "productId",
    otherKey: "userId",
});

// Associações entre Usuário e Produto com Favoritos
// Para evitar erros ao deletar usuário será apagado
// todos os dados associados referente ao usuário.
UserModel.hasMany(FavoriteModel, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});
FavoriteModel.belongsTo(UserModel, {
    foreignKey: "userId",
});

ProductModel.hasMany(FavoriteModel, {
    foreignKey: "productId",
    onDelete: "CASCADE",
});
FavoriteModel.belongsTo(ProductModel, {
    foreignKey: "productId",
});

// await sequelize.sync({ force: true });

export { UserModel, AddressModel, ProductModel, FavoriteModel };
