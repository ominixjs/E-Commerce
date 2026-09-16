//=== Models
import UserModel from "./User.js";
import AddressModel from "./Address.js";
import ProductModel from "./Product.js";

// Associações -->
UserModel.hasMany(AddressModel, { foreignKey: "userId", onDelete: "CASCADE" });
AddressModel.belongsTo(UserModel, { foreignKey: "addressId" });

// await sequelize.sync({ force: true });

export { UserModel, AddressModel, ProductModel };
