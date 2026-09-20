import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Favorite = sequelize.define(
    "Favorites",
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ["userId", "productId"],
            },
        ],
    },
);

export default Favorite;
