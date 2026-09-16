import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Product = sequelize.define(
    "products",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(180),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        coverUrl: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
    },
);

export default Product;
