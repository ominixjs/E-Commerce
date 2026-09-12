//=== Models
import UserModel from "./User.js";
import AddressModel from "./Address.js";

// Associações -->
UserModel.hasMany(AddressModel, { onDelete: "CASCADE" });
AddressModel.belongsTo(UserModel);

// await sequelize.sync({ force: true });

export { UserModel, AddressModel };
