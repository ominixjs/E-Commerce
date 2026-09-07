import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const User = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true },
);

export default User;
