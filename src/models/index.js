import sequelize from "../configs/database.js";

//=== Models
import UserModel from "./User.js";

// Associações -->

// await sequelize.sync({ force: true });

export { UserModel };
