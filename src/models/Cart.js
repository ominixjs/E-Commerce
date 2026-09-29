import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Cart = sequelize.define(
    "Cart",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
    },
);

export default Cart;
