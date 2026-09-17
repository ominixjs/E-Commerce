//=== Models
import UserModel from "./User.js";
import AddressModel from "./Address.js";
import ProductModel from "./Product.js";

// Associações -->
UserModel.hasMany(AddressModel, {
    foreignKey: "userId",
    onDelete: "CASCADE", // Deleta a associação quando o usuário for deletado
    hooks: true, // Garante que os hooks do Sequelize também rodem nos filhos, se necessário
});

AddressModel.belongsTo(UserModel, { foreignKey: "addressId" });

// await sequelize.sync({ force: true });

export { UserModel, AddressModel, ProductModel };
