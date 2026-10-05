import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Order = sequelize.define(
    "Orders",
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
        status: {
            type: DataTypes.ENUM(
                "PENDING",
                "PAID",
                "PROCESSING",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED",
            ),
            defaultValue: "PENDING",
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        shippingStreet: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippingNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        shippingCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippingState: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippingComplement: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippingZipCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
    },
);

export default Order;
